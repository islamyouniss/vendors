import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";

import {switchMap} from "rxjs/operators";
import {User} from "../models/User.model";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        )
    }

    async signup(name: string, email: string, password: string, role: string) {
        await this.afAuth.createUserWithEmailAndPassword(email, password).then(response => {
            let userRoles = {
                viewer: true
            }
            userRoles[role] = true;
            return this.addUserData({
                uid: response.user.uid,
                email: response.user.email,
                displayName: name,
                roles: userRoles
            });
        })
    }

    async login(email: string, password: string) {
        await this.afAuth.signInWithEmailAndPassword(email, password).then(response => {
            return this.updateUserData({uid: response.user.uid, email: response.user.email});
        });
    }

    async logout() {
        await this.afAuth.signOut();
        return this.router.navigate(["/login"])
    }

    private addUserData({uid, email, roles, displayName}: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
        const data = {
            uid,
            email,
            displayName,
            roles
        };
        return userRef.set(data, {merge: true});
    }

    //can add more data for the user in this method
    private updateUserData({uid, email}: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
        const data = {
            uid,
            email,
            roles: {
                viewer: true
            }
        };
        return userRef.set(data, {merge: true});
    }

    checkAuthorization(user: User, allowedRoles: string[]): boolean {
        if (!user) return false;
        for(const role of allowedRoles) {
            if (user.roles[role]) {
                return true;
            }
        }
        return false;
    }

    canRead(user: User): boolean {
        const allowedRoles = ["admin", "editor", "viewer"];
        return this.checkAuthorization(user, allowedRoles);
    }

    canUpdate(user: User): boolean {
        const allowedRoles = ["admin", "editor"];
        return this.checkAuthorization(user, allowedRoles);
    }
    canCreate(user: User): boolean {
        const allowedRoles = ["admin", "editor"];
        return this.checkAuthorization(user, allowedRoles);
    }

    canDelete(user: User): boolean {
        const allowedRoles = ["admin"];
        return this.checkAuthorization(user, allowedRoles);
    }
}
