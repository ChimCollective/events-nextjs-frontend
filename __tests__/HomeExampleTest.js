/**
 * @description
 * - The render object is imported to render our React.js components.
 * - The screen object is also imported, which gives us access to the page document.
 * - And the extend-expect module is imported from @testing-library/jest-dom for our assertions. It provides custom matchers to test the state of the DOM
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// the component we will be testing
// our index page component found in /pages/index.js, is imported.
import Home from '../pages/index';

/**
 * @description
 * - A test is then included that renders the homepage component (<Home />) exported in the /pages/index.js file
 * - and checks to see if the Get started by editing text that displays on the page is presented in the component.
 */
 test("Check for Getting Started Text", () => {
  const { getByText } = render(<Home />);
  expect(getByText("Get started by editing")).toBeInTheDocument();
});

/**
 * @description
 * - This test uses the 'screen' object to access the React.js DOM 
 * - and asserts a heading that contains the text Welcome to Next.js!. 
 */
it("Renders appropriately", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { name: "Welcome to Next.js!" })
  ).toBeInTheDocument();
});

/**
 * More testing examples from React Testing Library
 * https://testing-library.com/docs/react-testing-library/example-intro 
 */