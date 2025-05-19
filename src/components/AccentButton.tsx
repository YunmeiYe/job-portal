import { Button, useComputedColorScheme } from '@mantine/core';

const AccentButton = (props: any) => {
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

  return <Button color={computedColorScheme === 'dark' ? 'brightSun.4' : 'brightSun.5'} {...props} />;
}

export default AccentButton
