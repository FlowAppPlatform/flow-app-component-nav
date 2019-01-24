import React from 'react';

import AppComponent from 'flow-app-component';

class NavItem extends AppComponent {
  constructor() {
    super();
    const newState = {
      properties: [
        {
          categoryName: 'General',
          categoryDescription: 'Basic Settings for your Nav Item',
          properties: [
            {
              id: 'name',
              name: 'Name',
              type: 'text',
              options: {},
              data: null,
            },
            {
              id: 'selected',
              name: 'Selected',
              type: 'boolean',
              options: {},
              data: false,
              renderOnPropsPanel: false,
            },
            {
              id: 'description',
              name: 'Description',
              type: 'description',
              options: {},
              data: null,
            },
            {
              id: 'link',
              name: 'Link',
              type: 'link',
              options: {
                type: ['internal', 'external'],
              },
              data: null,
            },
            {
              id: 'sub-nav-items',
              name: 'Sub Nav Items',
              type: 'component',
              options: {
                type: 'subNavItem',
              },
              multi: true,
              data: null,
            },
            {
              id: 'square-logo',
              name: 'Square Icon',
              type: 'image',
              options: {
                sizeRequirement: 'square',
              },
              data: null,
            },
          ],
        },
        {
          categoryName: 'Events',
          categoryDescription: 'Events for the Nav Item',
          properties: [
            {
              id: 'event',
              name: 'Events',
              type: 'graph',
              options: {},
              data: null,
            },
          ],
        },
      ],
      iconUrl: '/assets/images/app-component.svg',
      name: 'Nav Item',
      componentType: 'navItem',
      category: 'Views',
      parent: null,
      showOnComponentsPanel: true,
      isDeleteable: true,
      isValuable: false, // this flag pops up a DELETE modal when the delete button is clicked. False will not show the modal.
      allowsChildren: true,
      allowedChildTypes: ['subNavItem'],
      allowedParentTypes: ['nav'],
    };

    this.state = Object.assign(this.state, newState); // merge two states together, and dont lose any parent state properties.
  }

  onSelect = () => {
    // tell the parent about selection
    // TODO: make sure this.props.componentData is okay to use.
    this.props.setPropertyData &&
      this.props.setPropertyData(
        this.props.componentData.parentId,
        'open-nav-id',
        this.props.componentData.id,
      );
  };

  renderContent() {
    const name = this.getPropertyData('name');
    const description = this.getPropertyData('description');
    const link = this.getPropertyData('link');
    const Children = this.renderChildren();
    const hasChildren = Children.length !== 0;

    const aProps = {
      ...(link && { href: link }),
    };
    const selected =
      this.getComponentPropertyData(
        this.props.componentData.parentId,
        'open-nav-id',
      ) === this.props.componentData.id;
    return (
      <li className="nav-item" onClick={this.onSelect}>
        <a {...aProps}>{name}</a>
        {selected &&
          hasChildren && <div className="nav-subitems">{Children}</div>}
      </li>
    );
  }

  renderOnPropertiesPanel() {
    return [
      {
        id: 'name',
        name: 'Name',
        type: 'text',
        options: {},
        data: null,
      },
      {
        id: 'description',
        name: 'Description',
        type: 'description',
        options: {},
        data: null,
      },
      {
        id: 'link',
        name: 'Link',
        type: 'link',
        options: {
          type: ['internal', 'external'],
        },
        data: null,
      },
    ];
  }
}

export default NavItem;
