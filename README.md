# Dash-kit - Vue.js Admin Panel Framework

[![npm version](https://badge.fury.io/js/dash-kit.svg)](https://www.npmjs.com/package/dash-kit)
[![GitHub license](https://img.shields.io/github/license/darwishdev/dashkit)](https://github.com/darwishdev/dashkit/blob/main/LICENSE)

Dash-kit is a powerful and feature-rich Vue.js admin panel framework that helps you create stunning and functional admin panels for your web applications. It provides a collection of reusable components, layout options, and utilities to make your admin panel development faster and easier.

## Features

- **Flexible Layout Components**: Use the `AppLayout` component to build customizable admin panel layouts with a sidebar, navigation bar, and main content area.

- **Dynamic Sidebar**: The `AppLayout` component automatically generates the sidebar based on the provided `app-menu` component. Easily customize the sidebar items and behavior.

- **Form Generation**: Dash-kit includes a form generation feature powered by FormKit, allowing you to quickly create dynamic forms for data input and management.

- **RTL and LTR Support**: Seamlessly switch between right-to-left (RTL) and left-to-right (LTR) layouts based on your application's language direction.

- **Toasts and Dialogs**: Integrated support for Dash-kit's `Toast` and `DynamicDialog` components, allowing you to display toast messages and create dynamic dialogs in your application.

- **Vue-Router Integration**: Easily integrate the `AppLayout` with Vue Router to manage your application's navigation and routing efficiently.

- **PrimeVue Components**: Dash-kit leverages the power of PrimeVue components to provide a polished and modern UI for your admin panel.

## Dependencies

Dash-kit relies on the following libraries:

- [FormKit](https://formkit.js.org): A flexible form generation library for Vue.js applications.

- [PrimeVue](https://www.primefaces.org/primevue/): A rich set of open-source UI components for Vue.js.

## Installation

You can install Dash-kit via NPM:

```bash
npm install dash-kit --save
```

## Documentation

For detailed documentation and usage examples, visit the [Dash-kit website](https://vuedashkit.com) and explore the [documentation](https://docs.vuedashkit.com).

## Getting Started

To start using Dash-kit, import the necessary components into your Vue application and set up the `AppLayout` as the parent component for your routes:

```javascript
// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { LoginView, UnauthorizedView } from "dash-kit/views";
import ProfileView from "../views/ProfileView.vue";
import DashboardView from "../views/DashboardView.vue";
import { AppLayout } from "dash-kit/base";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/dashboard",
          name: "dashboard_view",
          component: DashboardView,
        },
        {
          path: "/profile",
          name: "profile_view",
          meta: { breadCrumbs: [{ label: "profile" }] },
          component: ProfileView,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: UnauthorizedView,
    },
  ],
});

export default router;
```

## Contributing

We welcome contributions from the community! If you find a bug, have a feature request, or want to contribute code, please follow our [contribution guidelines](https://github.com/darwishdev/dashkit/blob/main/CONTRIBUTING.md).

## License

Dash-kit is open-source software licensed under the [MIT License](https://github.com/darwishdev/dashkit/blob/main/LICENSE).
