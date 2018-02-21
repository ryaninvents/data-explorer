import {expect} from 'chai';
import makeAbortable from './index';

it('should abort the promise', () => {
  const promise = makeAbortable(new Promise((ok, fail) => {
    ok();
  }));
  promise.controller.abort();
  
  return promise.then(() => {
    throw new Error('Should not get here');
  }, (err) => {
    expect(err.message).to.equal('Aborted');
  });
});
