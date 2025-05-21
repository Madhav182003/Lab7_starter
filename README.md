1. The best option is 1, running automated tests within a GitHub action on every code push. This ensures bugs are caught early, keeps code quality high, and supports continuous integration by automatically testing all changes. It's more reliable than manual testing and provides faster feedback than waiting until all development is done.

2. Would you use an end to end test to check if a function is returning the correct output? (yes/no) - no

3. What is the difference between navigation and snapshot mode?
   Navigation mode analyzes a page right after it loads, while snapshot mode analyzes the current state of the page. Navigation is good for measuring load performance, but snapshot is better for checking static content like accessibility without interactions.

4. Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results:

   1. Add a meta name="viewport" tag
      This will improve mobile responsiveness and fix issues flagged under both Best Practices and Accessibility.

   2. Properly size and optimize images
      Resize large images and serve them in next-gen formats (like WebP) to reduce load times and save bandwidth, as suggested in the Performance diagnostics.

   3. Add important metadata
      Include a meta name="description" tag and an lang attribute on the html element to improve SEO and accessibility for screen readers and search engines.
