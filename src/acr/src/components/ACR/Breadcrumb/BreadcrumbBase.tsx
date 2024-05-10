import { BreadcrumbBaseProps } from './Breadcrumb.props';
import { Text } from '@sitecore-jss/sitecore-jss-react';

import cn from 'classnames';

const defaultProps = {};

/**
 * Breadcrumb - TODO_SCAFFOLD_FE: a good description of this component
 * @param props The UI data coming from the parent component
 * @returns TODO_SCAFFOLD_FE: a good description of what this component renders
 */
const BreadcrumbBase = (props: BreadcrumbBaseProps): JSX.Element => {
  const { fields, testId, styleClasses } = props;

  const { heading } = fields ?? {};

  return (
    <div className={cn(styleClasses)} data-testid={testId}>
      <Text tag="h2" field={heading} />
      <p>The Breadcrumb Component</p>
    </div>
  );
};

BreadcrumbBase.defaultProps = defaultProps;

export default BreadcrumbBase;
