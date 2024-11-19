# @components/app

Contains components for the main application UI in the Open Noodl Editor.

## Contents

### SideNavigation

A navigation component that provides a vertical sidebar with icon buttons and an optional expandable panel.

#### Components

- **SideNavigation**

  - Main container component that renders a toolbar and panel area
  - Props:
    - `toolbar`: Slot - Content for the toolbar section
    - `panel`: Slot - Content for the expandable panel
    - `onExitClick`: Optional callback for exit button click

- **SideNavigationButton**
  - Individual navigation button with icon and optional tooltip/menu
  - Props:
    - `isActive`: Optional boolean to show active state
    - `icon`: IconName - The icon to display
    - `label`: string - Button label shown in tooltip
    - `fineType`: Optional string for additional tooltip text
    - `notification`: Optional `{ count: number }` for notification badge
    - `isDisabled`: Optional boolean to disable the button
    - `testId`: Optional string for testing
    - `onClick`: Optional click handler
    - `menuItems`: Optional array of menu items

#### Context

The SideNavigation components use a shared context (`SideNavigationContext`) that manages:

- `isShowingTooltips`: Boolean state for tooltip visibility
- `setIsShowingTooltips`: Function to update tooltip visibility

#### Styling

The component uses CSS modules with the following key features:

- Responsive sidebar with hover effects
- Notification badge support
- Themeable colors through CSS variables
- Smooth transitions for interactions

#### Usage Example

```tsx
import { SideNavigation, SideNavigationButton } from '@noodl-core-ui/components/app/SideNavigation';
import { IconName } from '@noodl-core-ui/components/common/Icon';
function AppNavigation() {
  return (
    <SideNavigation
      toolbar={
        <>
          <SideNavigationButton icon={IconName.Home} label="Home" isActive={true} />
          <SideNavigationButton icon={IconName.Settings} label="Settings" notification={{ count: 3 }} />
        </>
      }
      panel={<div>Panel Content</div>}
      onExitClick={() => console.log('Exit clicked')}
    />
  );
}
```

### TitleBar

A customizable title bar component for desktop applications, with special support for Windows window controls.

#### Components

- **TitleBar**
  - Main component that renders an application title bar with optional version info and window controls
  - Props:
    - `title`: string - The title text to display
    - `version`: Optional string - Version number to display
    - `state`: Optional TitleBarState - Controls update notification states
    - `variant`: Optional TitleBarVariant - Visual style variant
    - `isWindows`: Optional boolean - Enable Windows-specific controls
    - `onMinimizeClicked`: Optional callback for minimize button
    - `onMaximizeClicked`: Optional callback for maximize button
    - `onCloseClicked`: Optional callback for close button
    - `onNewVersionAvailableClicked`: Optional callback for version update
    - `onNewUpdateAvailableClicked`: Optional callback for update downloaded

#### Enums

```ts
enum TitleBarVariant {
  Default = 'default',
  Shallow = 'shallow'
}
enum TitleBarState {
  Default = 'default',
  UpdateAvailable = 'version-available',
  Updated = 'version-updated'
}
```

#### Styling

The component uses CSS modules with the following key features:

- Draggable title bar area (-webkit-app-region)
- Windows-style window controls (minimize, maximize, close)
- Themeable colors through CSS variables
- Update notification states
- Centered title text
- Version number display

#### Usage Example

```tsx
import { TitleBar } from '@noodl-core-ui/components/app/TitleBar';

function AppTitleBar() {
  return <TitleBar title="My App" version="1.0.0" state={TitleBarState.Default} />;
}
```

The implementation details can be found in:

- `TitleBar.tsx`
- `TitleBar.module.scss`

And its styles are defined in:

- `TitleBar.module.scss`
