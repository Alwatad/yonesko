import { type Payload } from "payload";

import { logger } from "../utils/logger";

// Remove the old commented code and use the proper functions below
//   payload: Payload,
//   mediaAssets: Record<string, unknown>,
//   products: {
//     bought: number;
//     title: { en?: string; pl?: string } | string;
//     media: unknown[];
//     slug: string;
//   }[],
// ): Promise<void> {
//   try {
//     // Home Page
//     await createHomePage(payload, mediaAssets, products);

//     // About Us Page
//     await createAboutPage(payload, mediaAssets);

//     // Contact Page
//     await createContactPage(payload);

//     // Terms & Conditions Page
//     await createTermsPage(payload);

//     logger.success("✓ All pages created successfully");
//   } catch (error) {
//     logger.error("Failed to seed pages:", error);
//     throw error;
//   }
// }

// async function createHomePage(
//   payload: Payload,
//   mediaAssets: Record<string, unknown>,
//   products: {
//     bought: number;
//     title: { en?: string; pl?: string } | string;
//     media: unknown[];
//     slug: string;
//   }[],
// ) {
//   const featuredProducts = products.filter((p) => p.bought > 50).slice(0, 4);

//   await payload.create({
//     collection: "pages",
//     context: { disableRevalidate: true }, // Disable Next.js revalidation during seeding
//     data: {
//       title: "Home",
//       slug: "home",
//       slugLock: true,
//       hero: {
//         type: "lowImpact", // Changed from highImpact to avoid media requirement
//         richText: {
//           root: {
//             children: [
//               {
//                 children: [
//                   {
//                     text: "Step into Style",
//                     bold: true,
//                   },
//                 ],
//                 type: "heading",
//                 tag: "h1",
//                 version: 1,
//               },
//               {
//                 children: [
//                   {
//                     text: "Discover our latest collection of premium footwear designed for comfort and style.",
//                   },
//                 ],
//                 type: "paragraph",
//                 version: 1,
//               },
//             ],
//             type: "root",
//             direction: "ltr",
//             format: "",
//             indent: 0,
//             version: 1,
//           },
//         },
//         links: [
//           {
//             link: {
//               type: "custom",
//               label: "Shop Now",
//               url: "/shop",
//               appearance: "default",
//             },
//           },
//           {
//             link: {
//               type: "custom",
//               label: "View Collection",
//               url: "/products",
//               appearance: "outline",
//             },
//           },
//         ],
//       },
//       layout: [
//         // Featured Products Carousel
//         {
//           blockType: "carousel",
//           blockName: "Featured Products",
//           title: {
//             root: {
//               children: [
//                 {
//                   children: [
//                     {
//                       text: "Best Sellers",
//                       bold: true,
//                     },
//                   ],
//                   type: "heading",
//                   tag: "h2",
//                   version: 1,
//                 },
//               ],
//               type: "root",
//               direction: "ltr",
//               format: "",
//               indent: 0,
//               version: 1,
//             },
//           },
//           type: "default",
//           autoplay: 5000,
//           slides: featuredProducts.map((product) => ({
//             image: product.media[0] as string,
//             enableLink: true,
//             link: {
//               type: "custom",
//               label: typeof product.title === "string" ? product.title : (product.title.en ?? "Product"),
//               url: `/products/${product.slug}`,
//               appearance: "default",
//             },
//           })),
//         },
//         // CTA Section
//         {
//           blockType: "cta",
//           blockName: "Newsletter CTA",
//           richText: {
//             root: {
//               children: [
//                 {
//                   children: [
//                     {
//                       text: "Stay in Step",
//                       bold: true,
//                     },
//                   ],
//                   type: "heading",
//                   tag: "h2",
//                   version: 1,
//                 },
//                 {
//                   children: [
//                     {
//                       text: "Subscribe to our newsletter and get 15% off your first order.",
//                     },
//                   ],
//                   type: "paragraph",
//                   version: 1,
//                 },
//               ],
//               type: "root",
//               direction: "ltr",
//               format: "",
//               indent: 0,
//               version: 1,
//             },
//           },
//           links: [
//             {
//               link: {
//                 type: "custom",
//                 label: "Subscribe Now",
//                 url: "/newsletter",
//                 appearance: "default",
//               },
//             },
//           ],
//         },
//         // Content Columns - Categories
//         {
//           blockType: "content",
//           blockName: "Shop by Category",
//           alignment: "center",
//           columns: [
//             {
//               size: "oneThird",
//               richText: {
//                 root: {
//                   children: [
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Men's Collection",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h3",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "From casual sneakers to formal dress shoes.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                   ],
//                   type: "root",
//                   direction: "ltr",
//                   format: "",
//                   indent: 0,
//                   version: 1,
//                 },
//               },
//               enableLink: true,
//               link: {
//                 type: "custom",
//                 label: "Shop Men",
//                 url: "/category/mens-shoes",
//                 appearance: "default",
//               },
//             },
//             {
//               size: "oneThird",
//               richText: {
//                 root: {
//                   children: [
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Women's Collection",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h3",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Elegant heels to comfortable flats.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                   ],
//                   type: "root",
//                   direction: "ltr",
//                   format: "",
//                   indent: 0,
//                   version: 1,
//                 },
//               },
//               enableLink: true,
//               link: {
//                 type: "custom",
//                 label: "Shop Women",
//                 url: "/category/womens-shoes",
//                 appearance: "default",
//               },
//             },
//             {
//               size: "oneThird",
//               richText: {
//                 root: {
//                   children: [
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Athletic Collection",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h3",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Performance footwear for every sport.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                   ],
//                   type: "root",
//                   direction: "ltr",
//                   format: "",
//                   indent: 0,
//                   version: 1,
//                 },
//               },
//               enableLink: true,
//               link: {
//                 type: "custom",
//                 label: "Shop Athletic",
//                 url: "/category/sports-athletic",
//                 appearance: "default",
//               },
//             },
//           ],
//         },
//       ],
//       _status: "published",
//     },
//   });

//   logger.info("✓ Created Home page");
// }

// async function createAboutPage(payload: Payload, _mediaAssets: Record<string, unknown>) {
//   await payload.create({
//     collection: "pages",
//     context: { disableRevalidate: true }, // Disable Next.js revalidation during seeding
//     data: {
//       title: "About Us",
//       slug: "about",
//       slugLock: true,
//       hero: {
//         type: "lowImpact", // Changed from mediumImpact to avoid media requirement
//         richText: {
//           root: {
//             children: [
//               {
//                 children: [
//                   {
//                     text: "Our Story",
//                     bold: true,
//                   },
//                 ],
//                 type: "heading",
//                 tag: "h1",
//                 version: 1,
//               },
//               {
//                 children: [
//                   {
//                     text: "Crafting quality footwear since 2020",
//                   },
//                 ],
//                 type: "paragraph",
//                 version: 1,
//               },
//             ],
//             type: "root",
//             direction: "ltr",
//             format: "",
//             indent: 0,
//             version: 1,
//           },
//         },
//       },
//       layout: [
//         {
//           blockType: "content",
//           blockName: "About Content",
//           alignment: "left",
//           columns: [
//             {
//               size: "full",
//               richText: {
//                 root: {
//                   children: [
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Welcome to Stride Footwear",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h2",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "At Stride, we believe that great shoes are the foundation of every journey. Founded in 2020, we set out with a simple mission: to create footwear that combines exceptional comfort with timeless style.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Our commitment to quality starts with carefully selected materials and extends through every stitch and sole. We work with skilled craftspeople who share our passion for creating shoes that not only look great but feel amazing from the first wear.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Our Values",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h3",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "• Quality: We never compromise on materials or craftsmanship",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "• Comfort: Every shoe is designed with your comfort in mind",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "• Style: Timeless designs that transcend seasonal trends",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "• Sustainability: Committed to reducing our environmental footprint",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                   ],
//                   type: "root",
//                   direction: "ltr",
//                   format: "",
//                   indent: 0,
//                   version: 1,
//                 },
//               },
//             },
//           ],
//         },
//       ],
//       _status: "published",
//     },
//   });

//   logger.info("✓ Created About page");
// }

// async function createContactPage(payload: Payload) {
//   // First create a contact form
//   const contactForm = await payload.create({
//     collection: "forms",
//     data: {
//       title: "Contact Form",
//       submitButtonLabel: "Send Message",
//       confirmationType: "message",
//       confirmationMessage: {
//         root: {
//           children: [
//             {
//               children: [
//                 {
//                   text: "Thank you for your message! We'll get back to you within 24 hours.",
//                 },
//               ],
//               type: "paragraph",
//               version: 1,
//             },
//           ],
//           type: "root",
//           direction: "ltr",
//           format: "",
//           indent: 0,
//           version: 1,
//         },
//       },
//       fields: [
//         {
//           blockType: "text",
//           name: "name",
//           label: "Your Name",
//           required: true,
//           width: 50,
//         },
//         {
//           blockType: "email",
//           name: "email",
//           label: "Email Address",
//           required: true,
//           width: 50,
//         },
//         {
//           blockType: "text",
//           name: "subject",
//           label: "Subject",
//           required: true,
//           width: 100,
//         },
//         {
//           blockType: "textarea",
//           name: "message",
//           label: "Message",
//           required: true,
//           width: 100,
//         },
//       ],
//       emails: [
//         {
//           emailTo: "info@stridefootwear.com",
//           emailFrom: "noreply@stridefootwear.com",
//           subject: "New Contact Form Submission",
//         },
//       ],
//     },
//   });

//   await payload.create({
//     collection: "pages",
//     context: { disableRevalidate: true }, // Disable Next.js revalidation during seeding
//     data: {
//       title: "Contact",
//       slug: "contact",
//       slugLock: true,
//       hero: {
//         type: "lowImpact",
//         richText: {
//           root: {
//             children: [
//               {
//                 children: [
//                   {
//                     text: "Get in Touch",
//                     bold: true,
//                   },
//                 ],
//                 type: "heading",
//                 tag: "h1",
//                 version: 1,
//               },
//               {
//                 children: [
//                   {
//                     text: "We'd love to hear from you",
//                   },
//                 ],
//                 type: "paragraph",
//                 version: 1,
//               },
//             ],
//             type: "root",
//             direction: "ltr",
//             format: "",
//             indent: 0,
//             version: 1,
//           },
//         },
//       },
//       layout: [
//         {
//           blockType: "content",
//           blockName: "Contact Info",
//           alignment: "center",
//           columns: [
//             {
//               size: "half",
//               richText: {
//                 root: {
//                   children: [
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Visit Our Store",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h3",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "123 Fashion Avenue",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "New York, NY 10001",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Monday - Friday: 10AM - 8PM",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Saturday - Sunday: 11AM - 7PM",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                   ],
//                   type: "root",
//                   direction: "ltr",
//                   format: "",
//                   indent: 0,
//                   version: 1,
//                 },
//               },
//             },
//             {
//               size: "half",
//               richText: {
//                 root: {
//                   children: [
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Contact Information",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h3",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Phone: +1 (555) 123-4567",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Email: info@stridefootwear.com",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Customer Service: support@stridefootwear.com",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                   ],
//                   type: "root",
//                   direction: "ltr",
//                   format: "",
//                   indent: 0,
//                   version: 1,
//                 },
//               },
//             },
//           ],
//         },
//         {
//           blockType: "formBlock",
//           form: contactForm.id,
//           enableIntro: true,
//           introContent: {
//             root: {
//               children: [
//                 {
//                   children: [
//                     {
//                       text: "Send us a message",
//                       bold: true,
//                     },
//                   ],
//                   type: "heading",
//                   tag: "h2",
//                   version: 1,
//                 },
//                 {
//                   children: [
//                     {
//                       text: "Have a question or feedback? We're here to help!",
//                     },
//                   ],
//                   type: "paragraph",
//                   version: 1,
//                 },
//               ],
//               type: "root",
//               direction: "ltr",
//               format: "",
//               indent: 0,
//               version: 1,
//             },
//           },
//         },
//       ],
//       _status: "published",
//     },
//   });

//   logger.info("✓ Created Contact page");
// }

// async function createTermsPage(payload: Payload) {
//   await payload.create({
//     collection: "pages",
//     context: { disableRevalidate: true }, // Disable Next.js revalidation during seeding
//     data: {
//       title: "Terms & Conditions",
//       slug: "terms",
//       slugLock: true,
//       hero: {
//         type: "lowImpact",
//         richText: {
//           root: {
//             children: [
//               {
//                 children: [
//                   {
//                     text: "Terms & Conditions",
//                     bold: true,
//                   },
//                 ],
//                 type: "heading",
//                 tag: "h1",
//                 version: 1,
//               },
//               {
//                 children: [
//                   {
//                     text: "Last updated: January 1, 2024",
//                   },
//                 ],
//                 type: "paragraph",
//                 version: 1,
//               },
//             ],
//             type: "root",
//             direction: "ltr",
//             format: "",
//             indent: 0,
//             version: 1,
//           },
//         },
//       },
//       layout: [
//         {
//           blockType: "content",
//           blockName: "Terms Content",
//           alignment: "left",
//           columns: [
//             {
//               size: "full",
//               richText: {
//                 root: {
//                   children: [
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "1. Acceptance of Terms",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h2",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "2. Use License",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h2",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Permission is granted to temporarily download one copy of the materials (information or software) on Stride Footwear's website for personal, non-commercial transitory viewing only.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "3. Disclaimer",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h2",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "The materials on Stride Footwear's website are provided on an 'as is' basis. Stride Footwear makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "4. Limitations",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h2",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "In no event shall Stride Footwear or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stride Footwear's website.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "5. Privacy Policy",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h2",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "Your privacy is important to us. Our privacy policy explains how we collect, use, and protect your personal information.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "6. Returns and Refunds",
//                           format: 1,
//                           version: 1,
//                         },
//                       ],
//                       type: "heading",
//                       tag: "h2",
//                       version: 1,
//                     },
//                     {
//                       children: [
//                         {
//                           type: "text",
//                           text: "We offer a 30-day return policy for unworn items in original packaging. Refunds will be processed within 5-7 business days of receiving the returned item.",
//                           version: 1,
//                         },
//                       ],
//                       type: "paragraph",
//                       version: 1,
//                     },
//                   ],
//                   type: "root",
//                   direction: "ltr",
//                   format: "",
//                   indent: 0,
//                   version: 1,
//                 },
//               },
//             },
//           ],
//         },
//       ],
//       _status: "published",
//     },
//   });

//   logger.info("✓ Created Terms & Conditions page");
// }

export async function seedPages(
  payload: Payload,
  mediaAssets: Record<string, unknown>,
  products: {
    bought: number;
    title: { en?: string; pl?: string } | string;
    media: unknown[];
    slug: string;
  }[],
): Promise<void> {
  try {
    // Home Page
    await createHomePage(payload, mediaAssets, products);
    
    // About Us Page
    await createAboutPage(payload, mediaAssets);
    
    // Contact Page
    await createContactPage(payload);
    
    // Terms & Conditions Page
    await createTermsPage(payload);

    logger.success("✓ All pages created successfully");
  } catch (error) {
    logger.error("Failed to seed pages:", error);
    throw error;
  }
}

// Helper function to create proper Lexical text nodes
function createTextNode(text: string, format = 0) {
  return {
    detail: 0,
    format,
    mode: "normal",
    style: "",
    text,
    type: "text",
    version: 1,
  };
}

// Helper function to create proper Lexical paragraph nodes
function createParagraphNode(children: { [k: string]: unknown; type: string; version: number }[]) {
  return {
    children,
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    type: "paragraph",
    version: 1,
  };
}

// Helper function to create proper Lexical heading nodes
function createHeadingNode(children: { [k: string]: unknown; type: string; version: number }[], tag: string) {
  return {
    children,
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    type: "heading",
    tag,
    version: 1,
  };
}

// Helper function to create proper Lexical root structure
function createRichTextRoot(children: { [k: string]: unknown; type: string; version: number }[]) {
  return {
    root: {
      children,
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      type: "root",
      version: 1,
    },
  };
}

async function createHomePage(
  payload: Payload,
  mediaAssets: Record<string, unknown>,
  products: {
    bought: number;
    title: { en?: string; pl?: string } | string;
    media: unknown[];
    slug: string;
  }[],
) {
  const featuredProducts = products.filter((p) => p.bought > 50).slice(0, 4);

  await payload.create({
    collection: "pages",
    context: { disableRevalidate: true },
    data: {
      title: "Home",
      slug: "home",
      slugLock: true,
      hero: {
        type: "highImpact", // Changed from lowImpact to show hero background image
        richText: createRichTextRoot([
          createHeadingNode(
            [
              createTextNode("Step into Style", 1), // format: 1 = bold
            ],
            "h1",
          ),
          createParagraphNode([
            createTextNode(
              "Discover our latest collection of premium footwear designed for comfort and style.",
            ),
          ]),
        ]),
        media: (mediaAssets["hero-running-shoes.jpg"] as { id: string })?.id, // Hero background image
        links: [
          {
            link: {
              type: "custom",
              label: "Shop Now",
              url: "/shop",
              appearance: "default",
            },
          },
          {
            link: {
              type: "custom",
              label: "View Collection",
              url: "/products",
              appearance: "outline",
            },
          },
        ],
      },
      layout: [
        // Featured Products Carousel
        {
          blockType: "carousel",
          blockName: "Featured Products",
          title: createRichTextRoot([createHeadingNode([createTextNode("Best Sellers", 1)], "h2")]),
          type: "default",
          autoplay: 5000,
          slides: featuredProducts.map((product) => ({
            image: product.media[0] as string,
            enableLink: true,
            link: {
              type: "custom",
              label: typeof product.title === "string" ? product.title : (product.title.en ?? "Product"),
              url: `/products/${product.slug}`,
              appearance: "default",
            },
          })),
        },
        // CTA Section
        {
          blockType: "cta",
          blockName: "Newsletter CTA",
          richText: createRichTextRoot([
            createHeadingNode([createTextNode("Stay in Step", 1)], "h2"),
            createParagraphNode([
              createTextNode("Subscribe to our newsletter and get 15% off your first order."),
            ]),
          ]),
          links: [
            {
              link: {
                type: "custom",
                label: "Subscribe Now",
                url: "/newsletter",
                appearance: "default",
              },
            },
          ],
        },
        // Content Columns - Categories
        {
          blockType: "content",
          blockName: "Shop by Category",
          alignment: "center",
          columns: [
            {
              size: "oneThird",
              richText: createRichTextRoot([
                createHeadingNode([createTextNode("Men's Collection", 1)], "h3"),
                createParagraphNode([createTextNode("From casual sneakers to formal dress shoes.")]),
              ]),
              enableLink: true,
              link: {
                type: "custom",
                label: "Shop Men",
                url: "/category/mens-shoes",
                appearance: "default",
              },
            },
            {
              size: "oneThird",
              richText: createRichTextRoot([
                createHeadingNode([createTextNode("Women's Collection", 1)], "h3"),
                createParagraphNode([createTextNode("Elegant heels to comfortable flats.")]),
              ]),
              enableLink: true,
              link: {
                type: "custom",
                label: "Shop Women",
                url: "/category/womens-shoes",
                appearance: "default",
              },
            },
            {
              size: "oneThird",
              richText: createRichTextRoot([
                createHeadingNode([createTextNode("Athletic Collection", 1)], "h3"),
                createParagraphNode([createTextNode("Performance footwear for every sport.")]),
              ]),
              enableLink: true,
              link: {
                type: "custom",
                label: "Shop Athletic",
                url: "/category/sports-athletic",
                appearance: "default",
              },
            },
          ],
        },
        // Additional Content Section
        {
          blockType: "content",
          blockName: "Lifestyle Text",
          alignment: "center",
          columns: [
            {
              size: "full",
              richText: createRichTextRoot([
                createHeadingNode([createTextNode("Find the Perfect Shoes for Every Occasion", 1)], "h2"),
                createParagraphNode([
                  createTextNode(
                    "Whether you're looking for comfortable shoes for daily city walks, elegant models for the office that will emphasize your professionalism, or perhaps unique creations for special occasions like weddings, galas, or important business meetings - our extensive collection offers solutions tailored to every lifestyle and need."
                  ),
                ]),
              ]),
            },
          ],
        },
        // Lifestyle Hero Image
        {
          blockType: "mediaBlock",
          blockName: "Lifestyle Image",
          media: (mediaAssets["hero-lifestyle.jpg"] as { id: string })?.id,
        },
      ],
      _status: "published",
    },
  });

  logger.info("✓ Created Home page");
}

async function createAboutPage(payload: Payload, _mediaAssets: Record<string, unknown>) {
  await payload.create({
    collection: "pages",
    context: { disableRevalidate: true },
    data: {
      title: "About Us",
      slug: "about",
      slugLock: true,
      hero: {
        type: "lowImpact",
        richText: createRichTextRoot([
          createHeadingNode([createTextNode("Our Story", 1)], "h1"),
          createParagraphNode([createTextNode("Crafting quality footwear since 2020")]),
        ]),
      },
      layout: [
        {
          blockType: "content",
          blockName: "About Content",
          alignment: "left",
          columns: [
            {
              size: "full",
              richText: createRichTextRoot([
                createHeadingNode([createTextNode("Welcome to Stride Footwear", 1)], "h2"),
                createParagraphNode([
                  createTextNode(
                    "At Stride, we believe that great shoes are the foundation of every journey. Founded in 2020, we set out with a simple mission: to create footwear that combines exceptional comfort with timeless style.",
                  ),
                ]),
                createParagraphNode([
                  createTextNode(
                    "Our commitment to quality starts with carefully selected materials and extends through every stitch and sole. We work with skilled craftspeople who share our passion for creating shoes that not only look great but feel amazing from the first wear.",
                  ),
                ]),
                createHeadingNode([createTextNode("Our Values", 1)], "h3"),
                createParagraphNode([
                  createTextNode("• Quality: We never compromise on materials or craftsmanship"),
                ]),
                createParagraphNode([
                  createTextNode("• Comfort: Every shoe is designed with your comfort in mind"),
                ]),
                createParagraphNode([
                  createTextNode("• Style: Timeless designs that transcend seasonal trends"),
                ]),
                createParagraphNode([
                  createTextNode("• Sustainability: Committed to reducing our environmental footprint"),
                ]),
              ]),
            },
          ],
        },
      ],
      _status: "published",
    },
  });

  logger.info("✓ Created About page");
}

async function createContactPage(payload: Payload) {
  // First create a contact form
  const contactForm = await payload.create({
    collection: "forms",
    data: {
      title: "Contact Form",
      submitButtonLabel: "Send Message",
      confirmationType: "message",
      confirmationMessage: createRichTextRoot([
        createParagraphNode([
          createTextNode("Thank you for your message! We'll get back to you within 24 hours."),
        ]),
      ]),
      fields: [
        {
          blockType: "text",
          name: "name",
          label: "Your Name",
          required: true,
          width: 50,
        },
        {
          blockType: "email",
          name: "email",
          label: "Email Address",
          required: true,
          width: 50,
        },
        {
          blockType: "text",
          name: "subject",
          label: "Subject",
          required: true,
          width: 100,
        },
        {
          blockType: "textarea",
          name: "message",
          label: "Message",
          required: true,
          width: 100,
        },
      ],
      emails: [
        {
          emailTo: "info@stridefootwear.com",
          emailFrom: "noreply@stridefootwear.com",
          subject: "New Contact Form Submission",
        },
      ],
    },
  });

  await payload.create({
    collection: "pages",
    context: { disableRevalidate: true },
    data: {
      title: "Contact",
      slug: "contact",
      slugLock: true,
      hero: {
        type: "lowImpact",
        richText: createRichTextRoot([
          createHeadingNode([createTextNode("Get in Touch", 1)], "h1"),
          createParagraphNode([createTextNode("We'd love to hear from you")]),
        ]),
      },
      layout: [
        {
          blockType: "content",
          blockName: "Contact Info",
          alignment: "center",
          columns: [
            {
              size: "half",
              richText: createRichTextRoot([
                createHeadingNode([createTextNode("Visit Our Store", 1)], "h3"),
                createParagraphNode([createTextNode("123 Fashion Avenue")]),
                createParagraphNode([createTextNode("New York, NY 10001")]),
                createParagraphNode([createTextNode("Monday - Friday: 10AM - 8PM")]),
                createParagraphNode([createTextNode("Saturday - Sunday: 11AM - 7PM")]),
              ]),
            },
            {
              size: "half",
              richText: createRichTextRoot([
                createHeadingNode([createTextNode("Contact Information", 1)], "h3"),
                createParagraphNode([createTextNode("Phone: +1 (555) 123-4567")]),
                createParagraphNode([createTextNode("Email: info@stridefootwear.com")]),
                createParagraphNode([createTextNode("Customer Service: support@stridefootwear.com")]),
              ]),
            },
          ],
        },
        {
          blockType: "formBlock",
          form: contactForm.id,
          enableIntro: true,
          introContent: createRichTextRoot([
            createHeadingNode([createTextNode("Send us a message", 1)], "h2"),
            createParagraphNode([createTextNode("Have a question or feedback? We're here to help!")]),
          ]),
        },
      ],
      _status: "published",
    },
  });

  logger.info("✓ Created Contact page");
}

async function createTermsPage(payload: Payload) {
  await payload.create({
    collection: "pages",
    context: { disableRevalidate: true },
    data: {
      title: "Terms & Conditions",
      slug: "terms",
      slugLock: true,
      hero: {
        type: "lowImpact",
        richText: createRichTextRoot([
          createHeadingNode([createTextNode("Terms & Conditions", 1)], "h1"),
          createParagraphNode([createTextNode("Last updated: January 1, 2024")]),
        ]),
      },
      layout: [
        {
          blockType: "content",
          blockName: "Terms Content",
          alignment: "left",
          columns: [
            {
              size: "full",
              richText: createRichTextRoot([
                createHeadingNode([createTextNode("1. Acceptance of Terms", 1)], "h2"),
                createParagraphNode([
                  createTextNode(
                    "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
                  ),
                ]),
                createHeadingNode([createTextNode("2. Use License", 1)], "h2"),
                createParagraphNode([
                  createTextNode(
                    "Permission is granted to temporarily download one copy of the materials (information or software) on Stride Footwear's website for personal, non-commercial transitory viewing only.",
                  ),
                ]),
                createHeadingNode([createTextNode("3. Disclaimer", 1)], "h2"),
                createParagraphNode([
                  createTextNode(
                    "The materials on Stride Footwear's website are provided on an 'as is' basis. Stride Footwear makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
                  ),
                ]),
                createHeadingNode([createTextNode("4. Limitations", 1)], "h2"),
                createParagraphNode([
                  createTextNode(
                    "In no event shall Stride Footwear or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stride Footwear's website.",
                  ),
                ]),
                createHeadingNode([createTextNode("5. Privacy Policy", 1)], "h2"),
                createParagraphNode([
                  createTextNode(
                    "Your privacy is important to us. Our privacy policy explains how we collect, use, and protect your personal information.",
                  ),
                ]),
                createHeadingNode([createTextNode("6. Returns and Refunds", 1)], "h2"),
                createParagraphNode([
                  createTextNode(
                    "We offer a 30-day return policy for unworn items in original packaging. Refunds will be processed within 5-7 business days of receiving the returned item.",
                  ),
                ]),
              ]),
            },
          ],
        },
      ],
      _status: "published",
    },
  });

  logger.info("✓ Created Terms & Conditions page");
}
