import { IXAccount, IXAccountUnverified } from "@/types/account";

export const Utils = {

    generateUniqueIntArray( count: number ): number[] {
        const arr = Array.from( { length: count }, ( _, i ) => i );

        for ( let i = arr.length - 1; i > 0; i-- ) {
            const j = Math.floor( Math.random() * ( i + 1 ) );
            [ arr[ i ], arr[ j ] ] = [ arr[ j ], arr[ i ] ];
        }

        return arr;
    },

    generateIntArray( count: number ): number[] {
        return Array.from( { length: count }, () => Math.floor( Math.random() * count ) );
    },

    generateFloatArray( count: number ): number[] {
        return Array.from( { length: count }, () => Math.random() * count );
    },

    validateAccount( xaccount: IXAccountUnverified ): IXAccount {
        return {
            ...xaccount,
            price: parseFloat( xaccount.price ),
            king: Math.random() < 0.2,
            flash: Math.random() < 0.2,
            bounce: Math.random() < 0.2,
        };
    },

    formatNumber( num: number ): string {
        if ( num >= 1_000_000 ) {
            return ( num / 1_000_000 ).toFixed( 1 ).replace( '.0', '' ) + 'kk';
        } else if ( num >= 1_000 ) {
            return ( num / 1_000 ).toFixed( 1 ).replace( '.0', '' ) + 'k';
        } else {
            return num.toString();
        }
    }
}