const debounceWrapper = () => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const debounce = (value: string, doSomeFn: () => void) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      doSomeFn();
    }, 200);
  };

  return debounce;
};

export const debounce = debounceWrapper();
