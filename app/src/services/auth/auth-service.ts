/**
 * AuthService - Singleton service to manage authentication state
 */
export class AuthService {
  private static instance: AuthService;
  private user: any = null;
  private loading: boolean = false;
  private listeners: Set<(user: any) => void> = new Set();

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  setUser(user: any) {
    this.user = user;
    this.notifyListeners();
  }

  getUser() {
    return this.user;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  isLoading() {
    return this.loading;
  }

  logout() {
    this.user = null;
    this.notifyListeners();
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  subscribe(listener: (user: any) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.user));
  }
}


