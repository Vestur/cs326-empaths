// add code for basic objects (charity, account/user, your hopes and dreams)

export class Charity {
    constructor() {
        console.log("Wazzup");
        // must set explicitly
        const name = ""
        const ein = "";
        // object containing key-value pairs with address info
        const mailingAddress = None;
        // object that contains financial info
        const irs_classification = None;
    }
    set_name(name) {
        self.name = name;
    }

    set_ein(ein) {
        self.ein = ein;
    }

    set_mailingAddress(address) {
        self.mailingAddress = address;
    }

    set_financial_info(info) {
        self.irs_classification = info;
    }

    get_name() {
        return self.name;
    }

    get_ein() {
        return self.ein;
    }

    get_mailingAddress() {
        return self.mailingAddress;
    }

    get_financial_info() {
        return self.irs_classification;
    }
}
