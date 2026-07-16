export const checkPasswordStrength = (password) => {
    if (!password) {
        return {
            text: "Weak",
            color: "bg-gray-300",
            width: "0%"
        };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        return {
            text: "Weak",
            color: "bg-red-500",
            width: "33%"
        };
    }

    if (score <= 4) {
        return {
            text: "Medium",
            color: "bg-yellow-500",
            width: "66%"
        };
    }

    return {
        text: "Strong",
        color: "bg-teal-500",
        width: "100%"
    };
};