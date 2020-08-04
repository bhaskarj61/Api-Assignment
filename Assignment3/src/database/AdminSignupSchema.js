export const AdminSignupSchema= {
    name: 'User',
    primaryKey:'email',
    properties:
    {
        name: 'string',
        email: 'string',
        password: 'string',
    }
};