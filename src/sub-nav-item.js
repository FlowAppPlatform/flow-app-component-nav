import React from 'react';

import AppComponent from 'flow-app-component';

class SubNavItem extends AppComponent {
  static properties = {
    iconUrl: '/assets/images/app-component.svg',
    name: 'Sub Nav Item',
    componentType: 'subNavItem',
    category: 'Views',
    parent: null,
    showOnComponentsPanel: false,
    isDeleteable: true,

    // this flag pops up a DELETE modal when the delete button is clicked. False will not show the modal.
    isValuable: false,

    allowsChildren: false
  };

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
              id: 'link',
              name: 'Link',
              type: 'link',
              options: {
                type: ['internal', 'external'],
              },
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
          categoryDescription: 'Events for the sub-nav item',
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

      ...SubNavItem.properties
    };

    this.state = Object.assign(this.state, newState); // merge two states together, and dont lose any parent state properties.
  }

  renderContent() {
    const name = this.getPropertyData('name');
    const link = this.getPropertyData('link');
    const logo = this.getPropertyData('square-logo');
    const description = this.getPropertyData('description');

    return (
      <div className="nav-subitem">
        <a href={link} className="nav-subitem--body nav-subitem--link">
          <div className="nav-subitem--text">
            <div className="nav-subitem--link-head">{name}</div>
            <div className="nav-subitem--link-body">{description}</div>
          </div>
          <div className="nav-subitem--logo">
            <img height="36" src={logo} />
          </div>
        </a>
      </div>
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

export default SubNavItem;
