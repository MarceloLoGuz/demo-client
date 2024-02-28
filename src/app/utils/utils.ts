export class Utils {
    static validatePasswords(password: string, confirmPassword: string) {
        let passwordsMatch = false;
        return passwordsMatch = password === confirmPassword;
    }


    
    static async loadFileAndConvertToBase64(file: File): Promise<string> {
        try {
            const base64String = await this.fileToBase64(file);
            return base64String;
        } catch (error) {
            return '';
        }
    }


    static async fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    }
}