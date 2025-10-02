
// This is a mock authentication service to simulate API calls.

export const signInWithPassword = (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!email || !password) {
                return reject(new Error("Email and password are required."));
            }
            if (email === "demo@dreamgate.com" && password === "DemoUser123!") {
                 return resolve();
            }
            if (password !== "password123") {
                return reject(new Error("Invalid login credentials"));
            }
            if (email.includes("unconfirmed")) {
                 return reject(new Error("Email not confirmed"));
            }
            resolve();
        }, 1500);
    });
};

export const signInWithProvider = (provider: 'google' | 'github'): Promise<void> => {
     return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Signing in with ${provider}...`);
            resolve();
        }, 1000);
    });
}

export const requestPasswordReset = (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!email.includes('@')) {
                return reject(new Error("Please enter a valid email address."));
            }
            if (email.includes("notfound")) {
                 return reject(new Error("User not found"));
            }
            console.log(`Password reset link sent to ${email}`);
            resolve();
        }, 1500);
    });
};
