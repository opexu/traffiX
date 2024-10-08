import { Utils } from "@/scripts/utils";
import { IXAccount } from "@/types/account";

export function fakeAccounts( count: number ): IXAccount[] {
    const idArr = Utils.generateUniqueIntArray( count );

    return idArr.map( id => {
        const index = Math.floor( Math.random() * FAKE_ACCOUNTS.length );
        return {
            id,
            name: FAKE_ACCOUNTS[ index ].name,
            followers_number: Math.floor( Math.random() * Number.MAX_SAFE_INTEGER ),
            avatar_url: FAKE_ACCOUNTS[ index ].avatar_url,
            average_views: Math.random() * Number.MAX_SAFE_INTEGER,
            price: Math.floor( Math.random() * 10000 )
        }
    } );
}

export const FAKE_ACCOUNTS: IXAccount[] = [
    {
        id: 0,
        name: "SpaceX",
        followers_number: 35853790,
        avatar_url: "https://pbs.twimg.com/profile_images/1697749409851985920/HbrI04tM_bigger.jpg",
        average_views: 1336222.6666666667,
        price: 10000
    },
    {
        id: 1,
        name: "gleb0x",
        followers_number: 1587,
        avatar_url: "https://pbs.twimg.com/profile_images/1761002965710602241/6HiwzYMp_bigger.jpg",
        average_views: 155,
        price: 0.055
    },
    {
        id: 2,
        name: "0xDiplomat",
        followers_number: 1562,
        avatar_url: "https://pbs.twimg.com/profile_images/1465060678260117508/gOB6gt78_bigger.jpg",
        average_views: 1240,
        price: 0.05
    }
]