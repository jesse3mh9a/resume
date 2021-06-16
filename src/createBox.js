import Box from "components/Box";
import useTheme from "hooks/useTheme";
import useSpace from "hooks/useSpace";

const createBox = (config) => {
  return (props) => {
    const theme = useTheme(config);
    const space = useSpace(config);
    return <Box theme={theme} space={space} {...props} />;
  };
};

export default createBox;
