### Styles
- **Card** :
  - `Box`,  `Typography` from @mui/material for layout and styling.
  - The `Card` component has a flexible layout with multiple `Box` elements nested inside.
  - The top part contains an image (`img` with 100% height and width) displayed in a box with rounded corners (`borderRadius` of 8px) and a shadow (`boxShadow` of 0px, 2px, 6px).

- **HomePage**: The Homepage, "/".
  - **Hero Section**:
    - `makeStyles` from @material-ui/core/styles: Hook for defining styles.
    - `Box` (with 100px padding on big screens and 80px padding on small screens), `Button`, `Typography`, `Container`, `Grid`, `Paper`, `Stack` from `@mui/material`: Components from Material-UI for layout and styling.
    - Used Material-UI's `makeStyles` hook to define styles for the component.
    -  background image with a gradient overlay (background: fade, backgroundSize: cover, backgroundPosition: centered).

  - **Products Section**: 
    - `Box`, `Grid`, `Stack`, `Typography`, `Button`, `useMediaQuery`, `OtherHousesOutlined` from @mui/material for layout and styling.
    - `Slider` from `react-slick` for creating a carousel/slider.
    - `ArrowBack` and `ArrowForward` from @material-ui/icons for back and forward arrow icons.
    - `Card` component for rendering individual product cards.

  - **Carousel Section**: 
    - `Box`, `Grid`, `Stack`, `Typography`, `Button`, `useMediaQuery`, `OtherHousesOutlined` from @mui/material for layout and styling.
    - Displays an image alongside information about a property. with 100% height and width.
    - Used `useMediaQuery` responsive styling to adjust content length and font size based on screen size.
    - Sets up a `slider/carousel` using the `Slider` component from react-slick
    - Renders multiple `Card` components based on `sliderItems` data.

- **Houses Listing**: The House Prices, "/products".
  - `Container`, `Box`, `Grid`, `Stack`, `Typography`, `Divider`, `styled`, `Drawer`, `CircularProgress`, `Button` from @mui/material for layout and styling.
  - `SentimentVeryDissatisfied` from `@material-ui/icons` for a dissatisfied sentiment icon.
  - Customizes the appearance of components using MUI's styling (`sx` prop) and customizes `Divider` as `CustomDivider`.
  - `Card` is a carousel with heightc of 75%.

- **Estates Listing**: The Estates, "/estate".
  - `Container`, `Box`, `Grid`, `Stack`, `Typography`, `Divider`, `styled`, `Drawer`, `CircularProgress`, `Button` from @mui/material for layout and styling.
  - `SentimentVeryDissatisfied` from `@material-ui/icons` for a dissatisfied sentiment icon.
  - Customizes the appearance of components using MUI's styling (`sx` prop) and customizes `Divider` as `CustomDivider`.
  - `Card` is a carousel with heightc of 75%.

- **Single House Description** "/products/:_id"
  - `Box`, `Grid`, `Stack`, `Typography`, `Button`, `useMediaQuery`, `OtherHousesOutlined` from @mui/material for layout and styling.
  - `useMediaQuery` from MUI to adapt the layout for non-mobile screens ((min-width:600px)).
  - images in the Carousel is 100%.

- **Single Estate Description** "/estates/:_id"
  - `Box`, `Grid`, `Stack`, `Typography`, `Button`, `useMediaQuery`, `OtherHousesOutlined` from @mui/material for layout and styling.
  - `useMediaQuery` from MUI to adapt the layout for non-mobile screens ((min-width:600px)).
  - images in the Carousel is 100%.

- **booking**: "/booking/:_id"  and "/bookings/:_id"
  - `Box`, `Grid`, `Stack`, `Typography`, `Button`, `useMediaQuery`, `OtherHousesOutlined` from @mui/material for layout and styling.
  - `useMediaQuery` to adjust layout based on screen size ("(min-width:750px)").
  - The Card image has an height and width of 100% with a `border radius` of 5px 5px 0px 0px.

- Timeline: "/about"
  - Timeline and TimelineItem components for displaying timelines, along with Grid, Box, and various text elements (h3, h4, p).
  - `useMediaQuery` to adjust layout based on screen size ("(min-width:968px)").
  - The banner image has an height is 400px and width is 100%.
