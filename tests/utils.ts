import { Observable } from 'rxjs';

export function testObservable<TVal>(observable: Observable<TVal>, done: jest.DoneCallback, assertions: (val: TVal) => void) {
  const subscription = observable.subscribe((value: TVal) => {
    try {
      assertions(value);
      done();
    } catch (err) {
      done.fail(err);
    } finally {
      subscription.unsubscribe();
    }
  });
}
