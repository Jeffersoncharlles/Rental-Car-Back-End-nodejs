/* ##############################################################################
# File: Specification.ts                                                       #
# Project: rentalbackendx                                                      #
# Created Date: 2021-09-24 01:41:00                                            #
# Author: Jefferson Charlles                                                   #
############################################################################## */

import { v4 as uuidV4 } from 'uuid';

class Specification {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Specification };
