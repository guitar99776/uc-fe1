declare namespace LoginType {
    interface INewUserPhoneLoginReqObject {
        code: string;
        phone: string;
    }

    interface IPasswordLoginReqObject {
        // code: string;
        userName: string;
        password: string;
    }
}
