'use strict';

const { Transform } = require( 'stream' );

module.exports = class ChunkingTransform extends Transform {

  constructor( chunkSize ) {

    super( { objectMode: true } );

    this.__chunks = [];
    this.__chunkSize = chunkSize;

  }

  _transform( chunk, enc, done ) {

    this.__chunks.push( chunk );

    if ( this.__chunks.length === this.__chunkSize ) {
      return this._flush( done );
    }

    done();

  }

  _flush( done ) {

    if ( this.__chunks.length ) {
      this.push( this.__chunks );
      this.__chunks = [];
    }

    done();

  }

};
