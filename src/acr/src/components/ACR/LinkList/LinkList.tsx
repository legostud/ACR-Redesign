import { LinkListProps } from 'components/ACR/LinkList/LinkList.props';
import Icon from '../Icon/Icon';

import { ButtonStyle } from 'src/enumerations/ButtonStyle.enum';
import { IconName } from 'src/enumerations/Icon.enum';

import LinkBase from 'components/ACR/Link/LinkBase';

import { LinkField, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * ACRAR-271 - Link List
 * @param props
 * @returns
 */
const LinkList = (props: LinkListProps): JSX.Element => {
  const { hasIcon = true, style = ButtonStyle.LINK, fields, testId } = props;
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext?.pageEditing ?? false;

  let links: LinkField[] = [];
  if (isPageEditing) {
    links = [
      fields.link1,
      fields.link2,
      fields.link3,
      fields.link4,
      fields.link5,
      fields.link6,
      fields.link7,
      fields.link8,
      fields.link9,
      fields.link10,
    ];
  } else {
    const addLinkIfNotEmpty = (l: LinkField) => {
      if (l?.value?.href) {
        links.push(l);
      }
    };

    addLinkIfNotEmpty(fields.link1);
    addLinkIfNotEmpty(fields.link2);
    addLinkIfNotEmpty(fields.link3);
    addLinkIfNotEmpty(fields.link4);
    addLinkIfNotEmpty(fields.link5);
    addLinkIfNotEmpty(fields.link6);
    addLinkIfNotEmpty(fields.link7);
    addLinkIfNotEmpty(fields.link8);
    addLinkIfNotEmpty(fields.link9);
    addLinkIfNotEmpty(fields.link10);
  }

  const renderBulletIcon = (): JSX.Element | null => {
    return (
      <Icon
        className={`
          invisible
          absolute
          left-0
          top-[3.2rem]
          inline-block
          h-2.5 
          w-4
          shrink-0
          text-t-link-hover
          duration-300
          ease-in-out

          peer-hover:visible
          peer-hover:left-2

          md:-left-2
          md:top-[3.3rem]
          md:w-5
          md:peer-hover:left-0
        `}
        iconName={IconName.BULLET}
        isAriaHidden={true}
      />
    );
  };

  return (
    <ul className="columns-md overflow-hidden md:block" data-ref="link-list" data-testid={testId}>
      {links.map((link, i) => (
        <li
          className="relative top-[calc(-1px-1rem)] 
         px-8 "
          key={i}
        >
          <LinkBase
            link={link}
            hasIcon={hasIcon}
            style={style}
            styleClasses={`
            !title-c
            text-t-primary
            pb-6
            pt-10
            justify-between
            w-full
            border-t-1 
            border-t-body
            peer

            hover:no-underline
          `}
            animate={false}
          />
          {renderBulletIcon()}
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
