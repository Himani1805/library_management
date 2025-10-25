import jwt from "jsonwebtoken";

async function authentication(request, response, next) {
    try {
        // const { token } = request.cookies;
        const token = request.cookies.token;
        if (!token) {
            return response.status(403).json({ messgae: "Authentication required " })
        }
        const payload = jwt.verify(token, "himani")
        request.user = payload
        // return next()
        next()

    } catch (error) {
        console.log("Authentication error:", error)
        return response.status(400).json({ messgae: "Invalid or expired token" })
    }
}
function authorization(roles) {
    return function (request, response, next) {
        try {
            const userRole = request.user.role;
            // console.log("userRole", userRole)
            // console.log("role", roles)
            // const isAuthenticated = roles.some(role=> role.includes(userRole))

            const isAuthenticated = roles.includes(userRole)

            if (!isAuthenticated) {
                return response.status(403).json({ messgae: "User is not authroize for this role. " })
            }
            return next()
        } catch (error) {
            console.log("Error from authentication", error)
            return response.status(403).json({ messgae: "Error from authentication" })
        }
    }
}

export { authentication, authorization };