import React from 'react';

import AppComponent from 'flow-app-component';
import './css/theme/default.scss';

class Nav extends AppComponent {
  static properties = {
    iconUrl: '/assets/images/app-component.svg',
    name: 'Nav',
    componentType: 'app',
    category: 'Views',
    parent: null,
    showOnComponentsPanel: false,
    isDeleteable: false,

    // this flag pops up a DELETE modal when the delete button is clicked. False will not show the modal.
    isValuable: true,

    allowsChildren: true,
    allowedChildTypes: ['navItem', 'search'],
    allowedParentTypes: ['app']
  };

  constructor() {
    super();
    this.navRef = null;
    const newState = {
      properties: [
        {
          categoryName: 'Style and Branding',
          categoryDescription: 'Change style and branding of your menu',
          properties: [
            {
              id: 'square-logo',
              name: 'App Logo',
              type: 'image',
              options: {
                sizeRequirement: 'square',
              },
              description: 'Upload a logo for your app',
              data: null,
            },
            {
              id: 'nav-items',
              name: 'Nav Items',
              type: 'component',
              options: {
                type: 'navItem',
              },
              multi: true,
              data: null,
            },
            {
              id: 'open-nav-id',
              name: 'Open Nav Item ID',
              type: 'text',
              renderOnPropsPanel: false,
              options: {},
            },
          ],
        },
        {
          categoryName: 'Advanced Settings',
          categoryDescription: 'Advanced Settings for Nav Component',
          properties: [
            {
              id: 'visible',
              name: 'Visible',
              type: 'boolean',
              options: {
                sizeRequirement: 'square',
              },
              data: null,
            },
          ],
        },
        {
          categoryName: 'Events',
          categoryDescription: 'Events for the Nav',
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

      ...Nav.properties
    };
    this.state = Object.assign(this.state, newState); // merge two states together, and dont lose any parent state properties.
    this.navRef = React.createRef();
  }

  clickedOutside = ev => {
    if (this.navRef && !this.navRef.current.contains(ev.target)) {
      if (this.getPropertyData('open-nav-id')) {
        this.setPropertyData(this.props.componentData.id, 'open-nav-id', null);
      }
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.clickedOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickedOutside);
  }

  renderContent() {
    const logo = this.getPropertyData('square-logo');
    return (
      <div className="nav-container">
        <div className="logo">
          <img src={logo} height="56" alt="Logo" />
        </div>
        <ul ref={this.navRef} className="nav-items-container">
          {this.renderChildren()}
        </ul>
      </div>
    );
  }
}

export default Nav;
