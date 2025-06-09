
import { PageProps } from "@/types/navigation";

export const withNavigation = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P & PageProps> => {
  return (props) => <Component {...props} />;
};
