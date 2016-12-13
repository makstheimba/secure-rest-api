Authentication system for rest api.
Users can get info from api only after authorization.
Token is given to each user after authorization describing his role and expiration date.
Token is generated with a HS256 algorithm.
Coding role into token prevents user from escalating privileges.
(user could get token for user-role and use it for admin)
User can only get info based on his role.


Demonstration:
    1. Try to get products without credentials.
    curl http://localhost:3000/api/v1/products

    2. Authorize WITHOUT admin role.
    curl -H "Content-Type: application/json" -X POST -d '{"username":"arvind","password":"pass123"}' http://localhost:3000/login

    3. Get products (ok).
    curl -H "Content-Type: application/json" -X GET -H "x-access-token:" http://localhost:3000/api/v1/products

    4. Get users (not authorized).
    curl -H "Content-Type: application/json" -X GET -H "x-access-token:" http://localhost:3000/api/v1/admin/users

    5. Authorize WITH admin role.

    6. Get products (ok).

    7. Get users (ok).

    8. Demonstrate this things with an interface.