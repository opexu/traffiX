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
}