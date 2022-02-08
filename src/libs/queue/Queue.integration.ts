import { makeQueue } from '.';

describe('Queue', () => {
  it('should execute callbacks in the order they are pushed', async () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    const queue = makeQueue();

    const promise1 = queue.push(async () => {
      cb1(Date.now());
      await new Promise((res) => setTimeout(res, 50));
    });
    const promise2 = queue.push(() => cb2(Date.now()));

    await Promise.all([promise1, promise2]);

    expect(cb1).toHaveBeenCalled();
    expect(cb2).toHaveBeenCalled();

    const time1 = cb1.mock.calls[0][0];
    const time2 = cb2.mock.calls[0][0];

    expect(time2).toBeGreaterThan(time1 + 50);
  });
});
