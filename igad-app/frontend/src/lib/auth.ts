import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID || '';
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID || '';

const userPool = new CognitoUserPool({
  UserPoolId: userPoolId,
  ClientId: clientId,
});

export interface AuthSession {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  groups: string[];
  approved: boolean;
}

export class AuthService {
  async signIn(username: string, password: string): Promise<AuthSession> {
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session: CognitoUserSession) => {
          const idToken = session.getIdToken().getJwtToken();
          const accessToken = session.getAccessToken().getJwtToken();
          const refreshToken = session.getRefreshToken().getToken();
          const payload = session.getIdToken().payload;
          
          const groups = payload['cognito:groups'] || [];
          const approved = groups.includes('ADMIN') || groups.includes('USER');

          resolve({
            idToken,
            accessToken,
            refreshToken,
            username: payload['cognito:username'] || username,
            groups,
            approved,
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async signUp(username: string, password: string, email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const attributeList = [
        new CognitoUserAttribute({
          Name: 'email',
          Value: email,
        }),
      ];

      userPool.signUp(username, password, attributeList, [], (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  async signOut(): Promise<void> {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  }

  async getCurrentSession(): Promise<AuthSession | null> {
    return new Promise((resolve) => {
      const cognitoUser = userPool.getCurrentUser();
      
      if (!cognitoUser) {
        resolve(null);
        return;
      }

      cognitoUser.getSession((err: any, session: CognitoUserSession) => {
        if (err || !session.isValid()) {
          resolve(null);
          return;
        }

        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();
        const payload = session.getIdToken().payload;
        
        const groups = payload['cognito:groups'] || [];
        const approved = groups.includes('ADMIN') || groups.includes('USER');

        resolve({
          idToken,
          accessToken,
          refreshToken,
          username: payload['cognito:username'] || cognitoUser.getUsername(),
          groups,
          approved,
        });
      });
    });
  }
}

export const authService = new AuthService();
