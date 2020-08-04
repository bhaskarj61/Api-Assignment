export const UserSignupSchema= {
    name: 'User',
    primaryKey:'email',
    properties:
    {
        name: 'string',
        email: 'string',
        password: 'string',
    }
};