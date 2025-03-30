const templateDesigns = [
  {
    Template_1: {
      counters: {
        u_row: 6,
        u_column: 6,
        u_content_text: 8,
        u_content_image: 2,
        u_content_button: 1,
        u_content_social: 1,
      },
      body: {
        id: "WelcomeEmail_001",
        rows: [
          {
            id: "row_1",
            cells: [1],
            columns: [
              {
                id: "col_1",
                contents: [
                  {
                    id: "text_1",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "14px",
                      color: "#afb0c7",
                      textAlign: "center",
                      lineHeight: "170%",
                      text: '<p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: {
              backgroundColor: "",
              columnsBackgroundColor: "",
              padding: "0px",
            },
          },
          {
            id: "row_2",
            cells: [1],
            columns: [
              {
                id: "col_2",
                contents: [
                  {
                    id: "image_1",
                    type: "image",
                    values: {
                      containerPadding: "20px",
                      src: {
                        url: "https://example.com/logo.png",
                        width: 200,
                        height: 50,
                        maxWidth: "32%",
                      },
                      textAlign: "center",
                      altText: "Company Logo",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_3",
            cells: [1],
            columns: [
              {
                id: "col_3",
                contents: [
                  {
                    id: "text_2",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "14px",
                      color: "#ffffff",
                      textAlign: "center",
                      lineHeight: "140%",
                      text: '<p style="font-size: 14px; line-height: 140%;"><strong>W E L C O M E  T O  [Company Name]!</strong></p>',
                    },
                  },
                  {
                    id: "text_3",
                    type: "text",
                    values: {
                      containerPadding: "0px 10px 31px",
                      fontSize: "28px",
                      color: "#ffffff",
                      textAlign: "center",
                      lineHeight: "140%",
                      text: '<p style="font-size: 28px; line-height: 39.2px;"><strong>We’re Excited to Help You Grow</strong></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
          {
            id: "row_4",
            cells: [1],
            columns: [
              {
                id: "col_4",
                contents: [
                  {
                    id: "text_4",
                    type: "text",
                    values: {
                      containerPadding: "33px 55px",
                      fontSize: "18px",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 18px; line-height: 28.8px;">Hi there, thanks for joining us! We’re your partners in marketing success.</p>',
                    },
                  },
                  {
                    id: "button_1",
                    type: "button",
                    values: {
                      href: {
                        name: "web",
                        values: {
                          href: "https://example.com/services",
                          target: "_blank",
                        },
                      },
                      buttonColors: {
                        color: "#FFFFFF",
                        backgroundColor: "#ff6600",
                        hoverColor: "#FFFFFF",
                        hoverBackgroundColor: "#3AAEE0",
                      },
                      size: { autoWidth: true, width: "100%" },
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "14px 44px 13px",
                      borderRadius: "4px",
                      text: '<span style="font-size: 16px;"><strong>Explore Our Services</strong></span>',
                      containerPadding: "10px",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_5",
            cells: [1],
            columns: [
              {
                id: "col_5",
                contents: [
                  {
                    id: "text_5",
                    type: "text",
                    values: {
                      containerPadding: "41px 55px 18px",
                      fontSize: "16px",
                      color: "#003399",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 20px; line-height: 32px;"><strong>Contact Us</strong></p><p>+1 123 456 7890</p><p>info@company.com</p>',
                    },
                  },
                  {
                    id: "social_1",
                    type: "social",
                    values: {
                      containerPadding: "10px 10px 33px",
                      icons: {
                        iconType: "circle-black",
                        icons: [
                          { url: "https://facebook.com/", name: "Facebook" },
                          { url: "https://linkedin.com/", name: "LinkedIn" },
                          { url: "https://instagram.com/", name: "Instagram" },
                        ],
                      },
                      align: "center",
                      iconSize: 32,
                      spacing: 17,
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#e5eaf5", padding: "0px" },
          },
          {
            id: "row_6",
            cells: [1],
            columns: [
              {
                id: "col_6",
                contents: [
                  {
                    id: "text_6",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "16px",
                      color: "#fafafa",
                      textAlign: "center",
                      lineHeight: "180%",
                      text: '<p style="font-size: 16px; line-height: 28.8px;">© 2025 [Company Name]. All Rights Reserved.</p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
        ],
        values: {
          popupWidth: "600px",
          contentWidth: "600px",
          fontFamily: {
            label: "Cabin",
            value: "'Cabin',sans-serif",
            url: "https://fonts.googleapis.com/css?family=Cabin:400,700",
          },
          textColor: "#000000",
          backgroundColor: "#f9f9f9",
          preheaderText: "Welcome to [Company Name]!",
        },
      },
      schemaVersion: 20,
    },
  },
  {
    Template_2: {
      counters: {
        u_row: 6,
        u_column: 6,
        u_content_text: 8,
        u_content_image: 2,
        u_content_button: 1,
        u_content_social: 1,
      },
      body: {
        id: "PromoLaunch_002",
        rows: [
          {
            id: "row_1",
            cells: [1],
            columns: [
              {
                id: "col_1",
                contents: [
                  {
                    id: "text_1",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "14px",
                      color: "#afb0c7",
                      textAlign: "center",
                      lineHeight: "170%",
                      text: '<p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: {
              backgroundColor: "",
              columnsBackgroundColor: "",
              padding: "0px",
            },
          },
          {
            id: "row_2",
            cells: [1],
            columns: [
              {
                id: "col_2",
                contents: [
                  {
                    id: "image_1",
                    type: "image",
                    values: {
                      containerPadding: "20px",
                      src: {
                        url: "https://example.com/logo.png",
                        width: 200,
                        height: 50,
                        maxWidth: "32%",
                      },
                      textAlign: "center",
                      altText: "Company Logo",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_3",
            cells: [1],
            columns: [
              {
                id: "col_3",
                contents: [
                  {
                    id: "text_2",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "28px",
                      color: "#ffffff",
                      textAlign: "center",
                      lineHeight: "140%",
                      text: '<p style="font-size: 28px; line-height: 39.2px;"><strong>Launch Special: 20% Off!</strong></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#ff6600", padding: "0px" },
          },
          {
            id: "row_4",
            cells: [1],
            columns: [
              {
                id: "col_4",
                contents: [
                  {
                    id: "text_4",
                    type: "text",
                    values: {
                      containerPadding: "33px 55px",
                      fontSize: "18px",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 18px; line-height: 28.8px;">Boost your brand with our new service—now at a discount! Ends in 48 hours.</p>',
                    },
                  },
                  {
                    id: "button_1",
                    type: "button",
                    values: {
                      href: {
                        name: "web",
                        values: {
                          href: "https://example.com/offer",
                          target: "_blank",
                        },
                      },
                      buttonColors: {
                        color: "#FFFFFF",
                        backgroundColor: "#ff6600",
                        hoverColor: "#FFFFFF",
                        hoverBackgroundColor: "#3AAEE0",
                      },
                      size: { autoWidth: true, width: "100%" },
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "14px 44px 13px",
                      borderRadius: "4px",
                      text: '<span style="font-size: 16px;"><strong>Claim Your Discount</strong></span>',
                      containerPadding: "10px",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_5",
            cells: [1],
            columns: [
              {
                id: "col_5",
                contents: [
                  {
                    id: "text_5",
                    type: "text",
                    values: {
                      containerPadding: "41px 55px 18px",
                      fontSize: "16px",
                      color: "#003399",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 20px; line-height: 32px;"><strong>Contact Us</strong></p><p>+1 123 456 7890</p><p>info@company.com</p>',
                    },
                  },
                  {
                    id: "social_1",
                    type: "social",
                    values: {
                      containerPadding: "10px 10px 33px",
                      icons: {
                        iconType: "circle-black",
                        icons: [
                          { url: "https://facebook.com/", name: "Facebook" },
                          { url: "https://linkedin.com/", name: "LinkedIn" },
                          { url: "https://instagram.com/", name: "Instagram" },
                        ],
                      },
                      align: "center",
                      iconSize: 32,
                      spacing: 17,
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#e5eaf5", padding: "0px" },
          },
          {
            id: "row_6",
            cells: [1],
            columns: [
              {
                id: "col_6",
                contents: [
                  {
                    id: "text_6",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "16px",
                      color: "#fafafa",
                      textAlign: "center",
                      lineHeight: "180%",
                      text: '<p style="font-size: 16px; line-height: 28.8px;">© 2025 [Company Name]. All Rights Reserved.</p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
        ],
        values: {
          popupWidth: "600px",
          contentWidth: "600px",
          fontFamily: {
            label: "Cabin",
            value: "'Cabin',sans-serif",
            url: "https://fonts.googleapis.com/css?family=Cabin:400,700",
          },
          textColor: "#000000",
          backgroundColor: "#f9f9f9",
          preheaderText: "Launch Special: 20% Off!",
        },
      },
      schemaVersion: 20,
    },
  },
  {
    Template_3: {
      counters: {
        u_row: 6,
        u_column: 8,
        u_content_text: 10,
        u_content_image: 2,
        u_content_button: 3,
        u_content_social: 1,
      },
      body: {
        id: "Newsletter_003",
        rows: [
          {
            id: "row_1",
            cells: [1],
            columns: [
              {
                id: "col_1",
                contents: [
                  {
                    id: "text_1",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "14px",
                      color: "#afb0c7",
                      textAlign: "center",
                      lineHeight: "170%",
                      text: '<p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: {
              backgroundColor: "",
              columnsBackgroundColor: "",
              padding: "0px",
            },
          },
          {
            id: "row_2",
            cells: [1],
            columns: [
              {
                id: "col_2",
                contents: [
                  {
                    id: "image_1",
                    type: "image",
                    values: {
                      containerPadding: "20px",
                      src: {
                        url: "https://example.com/logo.png",
                        width: 200,
                        height: 50,
                        maxWidth: "32%",
                      },
                      textAlign: "center",
                      altText: "Company Logo",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_3",
            cells: [1],
            columns: [
              {
                id: "col_3",
                contents: [
                  {
                    id: "text_2",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "28px",
                      color: "#ffffff",
                      textAlign: "center",
                      lineHeight: "140%",
                      text: '<p style="font-size: 28px; line-height: 39.2px;"><strong>Your Monthly Marketing Boost</strong></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
          {
            id: "row_4",
            cells: [1, 1, 1],
            columns: [
              {
                id: "col_4",
                contents: [
                  {
                    id: "text_4",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "16px",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 16px; line-height: 25.6px;"><strong>SEO Tips</strong></p><p>Latest trends for 2025.</p>',
                    },
                  },
                  {
                    id: "button_1",
                    type: "button",
                    values: {
                      href: {
                        name: "web",
                        values: {
                          href: "https://example.com/seo",
                          target: "_blank",
                        },
                      },
                      buttonColors: {
                        color: "#FFFFFF",
                        backgroundColor: "#ff6600",
                      },
                      fontSize: "14px",
                      text: '<span style="font-size: 14px;">Read More</span>',
                      containerPadding: "10px",
                    },
                  },
                ],
                values: { padding: "0px" },
              },
              {
                id: "col_5",
                contents: [
                  {
                    id: "text_5",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "16px",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 16px; line-height: 25.6px;"><strong>Client Win</strong></p><p>50% lead increase!</p>',
                    },
                  },
                  {
                    id: "button_2",
                    type: "button",
                    values: {
                      href: {
                        name: "web",
                        values: {
                          href: "https://example.com/case-study",
                          target: "_blank",
                        },
                      },
                      buttonColors: {
                        color: "#FFFFFF",
                        backgroundColor: "#ff6600",
                      },
                      fontSize: "14px",
                      text: '<span style="font-size: 14px;">Read More</span>',
                      containerPadding: "10px",
                    },
                  },
                ],
                values: { padding: "0px" },
              },
              {
                id: "col_6",
                contents: [
                  {
                    id: "text_6",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "16px",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 16px; line-height: 25.6px;"><strong>Tool Spotlight</strong></p><p>Best analytics tool.</p>',
                    },
                  },
                  {
                    id: "button_3",
                    type: "button",
                    values: {
                      href: {
                        name: "web",
                        values: {
                          href: "https://example.com/tools",
                          target: "_blank",
                        },
                      },
                      buttonColors: {
                        color: "#FFFFFF",
                        backgroundColor: "#ff6600",
                      },
                      fontSize: "14px",
                      text: '<span style="font-size: 14px;">Read More</span>',
                      containerPadding: "10px",
                    },
                  },
                ],
                values: { padding: "0px" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_5",
            cells: [1],
            columns: [
              {
                id: "col_7",
                contents: [
                  {
                    id: "text_7",
                    type: "text",
                    values: {
                      containerPadding: "41px 55px 18px",
                      fontSize: "16px",
                      color: "#003399",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 20px; line-height: 32px;"><strong>Contact Us</strong></p><p>+1 123 456 7890</p><p>info@company.com</p>',
                    },
                  },
                  {
                    id: "social_1",
                    type: "social",
                    values: {
                      containerPadding: "10px 10px 33px",
                      icons: {
                        iconType: "circle-black",
                        icons: [
                          { url: "https://facebook.com/", name: "Facebook" },
                          { url: "https://linkedin.com/", name: "LinkedIn" },
                          { url: "https://instagram.com/", name: "Instagram" },
                        ],
                      },
                      align: "center",
                      iconSize: 32,
                      spacing: 17,
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#e5eaf5", padding: "0px" },
          },
          {
            id: "row_6",
            cells: [1],
            columns: [
              {
                id: "col_8",
                contents: [
                  {
                    id: "text_8",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "16px",
                      color: "#fafafa",
                      textAlign: "center",
                      lineHeight: "180%",
                      text: '<p style="font-size: 16px; line-height: 28.8px;">© 2025 [Company Name]. All Rights Reserved.</p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
        ],
        values: {
          popupWidth: "600px",
          contentWidth: "600px",
          fontFamily: {
            label: "Cabin",
            value: "'Cabin',sans-serif",
            url: "https://fonts.googleapis.com/css?family=Cabin:400,700",
          },
          textColor: "#000000",
          backgroundColor: "#f9f9f9",
          preheaderText: "Your Monthly Marketing Boost",
        },
      },
      schemaVersion: 20,
    },
  },

  {
    Template_4: {
      counters: {
        u_row: 6,
        u_column: 6,
        u_content_text: 8,
        u_content_image: 2,
        u_content_button: 1,
        u_content_social: 1,
      },
      body: {
        id: "EventInvite_004",
        rows: [
          {
            id: "row_1",
            cells: [1],
            columns: [
              {
                id: "col_1",
                contents: [
                  {
                    id: "text_1",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "14px",
                      color: "#afb0c7",
                      textAlign: "center",
                      lineHeight: "170%",
                      text: '<p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: {
              backgroundColor: "",
              columnsBackgroundColor: "",
              padding: "0px",
            },
          },
          {
            id: "row_2",
            cells: [1],
            columns: [
              {
                id: "col_2",
                contents: [
                  {
                    id: "image_1",
                    type: "image",
                    values: {
                      containerPadding: "20px",
                      src: {
                        url: "https://example.com/webinar.png",
                        width: 300,
                        height: 100,
                        maxWidth: "50%",
                      },
                      textAlign: "center",
                      altText: "Webinar Banner",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_3",
            cells: [1],
            columns: [
              {
                id: "col_3",
                contents: [
                  {
                    id: "text_2",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "28px",
                      color: "#ffffff",
                      textAlign: "center",
                      lineHeight: "140%",
                      text: '<p style="font-size: 28px; line-height: 39.2px;"><strong>Join Our Free Webinar: Social Media Mastery</strong></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
          {
            id: "row_4",
            cells: [1],
            columns: [
              {
                id: "col_4",
                contents: [
                  {
                    id: "text_4",
                    type: "text",
                    values: {
                      containerPadding: "33px 55px",
                      fontSize: "18px",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 18px; line-height: 28.8px;">Date: April 10, 2025 | Time: 2 PM EST | Speaker: Jane Doe</p>',
                    },
                  },
                  {
                    id: "button_1",
                    type: "button",
                    values: {
                      href: {
                        name: "web",
                        values: {
                          href: "https://example.com/register",
                          target: "_blank",
                        },
                      },
                      buttonColors: {
                        color: "#FFFFFF",
                        backgroundColor: "#ff6600",
                        hoverColor: "#FFFFFF",
                        hoverBackgroundColor: "#3AAEE0",
                      },
                      size: { autoWidth: true, width: "100%" },
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "14px 44px 13px",
                      borderRadius: "4px",
                      text: '<span style="font-size: 16px;"><strong>Reserve Your Spot</strong></span>',
                      containerPadding: "10px",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_5",
            cells: [1],
            columns: [
              {
                id: "col_5",
                contents: [
                  {
                    id: "text_5",
                    type: "text",
                    values: {
                      containerPadding: "41px 55px 18px",
                      fontSize: "16px",
                      color: "#003399",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 20px; line-height: 32px;"><strong>Contact Us</strong></p><p>+1 123 456 7890</p><p>info@company.com</p>',
                    },
                  },
                  {
                    id: "social_1",
                    type: "social",
                    values: {
                      containerPadding: "10px 10px 33px",
                      icons: {
                        iconType: "circle-black",
                        icons: [
                          { url: "https://facebook.com/", name: "Facebook" },
                          { url: "https://linkedin.com/", name: "LinkedIn" },
                          { url: "https://instagram.com/", name: "Instagram" },
                        ],
                      },
                      align: "center",
                      iconSize: 32,
                      spacing: 17,
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#e5eaf5", padding: "0px" },
          },
          {
            id: "row_6",
            cells: [1],
            columns: [
              {
                id: "col_6",
                contents: [
                  {
                    id: "text_6",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "16px",
                      color: "#fafafa",
                      textAlign: "center",
                      lineHeight: "180%",
                      text: '<p style="font-size: 16px; line-height: 28.8px;">© 2025 [Company Name]. All Rights Reserved.</p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
        ],
        values: {
          popupWidth: "600px",
          contentWidth: "600px",
          fontFamily: {
            label: "Cabin",
            value: "'Cabin',sans-serif",
            url: "https://fonts.googleapis.com/css?family=Cabin:400,700",
          },
          textColor: "#000000",
          backgroundColor: "#f9f9f9",
          preheaderText: "Join Our Free Webinar!",
        },
      },
      schemaVersion: 20,
    },
  },
  {
    Template_5: {
      counters: {
        u_row: 6,
        u_column: 7,
        u_content_text: 8,
        u_content_image: 3,
        u_content_button: 1,
        u_content_social: 1,
      },
      body: {
        id: "Testimonial_005",
        rows: [
          {
            id: "row_1",
            cells: [1],
            columns: [
              {
                id: "col_1",
                contents: [
                  {
                    id: "text_1",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "14px",
                      color: "#afb0c7",
                      textAlign: "center",
                      lineHeight: "170%",
                      text: '<p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: {
              backgroundColor: "",
              columnsBackgroundColor: "",
              padding: "0px",
            },
          },
          {
            id: "row_2",
            cells: [1],
            columns: [
              {
                id: "col_2",
                contents: [
                  {
                    id: "image_1",
                    type: "image",
                    values: {
                      containerPadding: "20px",
                      src: {
                        url: "https://example.com/logo.png",
                        width: 200,
                        height: 50,
                        maxWidth: "32%",
                      },
                      textAlign: "center",
                      altText: "Company Logo",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_3",
            cells: [1],
            columns: [
              {
                id: "col_3",
                contents: [
                  {
                    id: "text_2",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "28px",
                      color: "#ffffff",
                      textAlign: "center",
                      lineHeight: "140%",
                      text: '<p style="font-size: 28px; line-height: 39.2px;"><strong>See What Our Clients Say</strong></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
          {
            id: "row_4",
            cells: [1, 1],
            columns: [
              {
                id: "col_4",
                contents: [
                  {
                    id: "text_4",
                    type: "text",
                    values: {
                      containerPadding: "33px 55px",
                      fontSize: "18px",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 18px; line-height: 28.8px;">"Increased our leads by 50% in just 3 months!" - Client Name</p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
              {
                id: "col_5",
                contents: [
                  {
                    id: "image_2",
                    type: "image",
                    values: {
                      containerPadding: "33px 55px",
                      src: {
                        url: "https://example.com/client.jpg",
                        width: 100,
                        height: 100,
                        maxWidth: "50%",
                      },
                      textAlign: "center",
                      altText: "Client Photo",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_5",
            cells: [1],
            columns: [
              {
                id: "col_6",
                contents: [
                  {
                    id: "button_1",
                    type: "button",
                    values: {
                      href: {
                        name: "web",
                        values: {
                          href: "https://example.com/consultation",
                          target: "_blank",
                        },
                      },
                      buttonColors: {
                        color: "#FFFFFF",
                        backgroundColor: "#ff6600",
                        hoverColor: "#FFFFFF",
                        hoverBackgroundColor: "#3AAEE0",
                      },
                      size: { autoWidth: true, width: "100%" },
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "14px 44px 13px",
                      borderRadius: "4px",
                      text: '<span style="font-size: 16px;"><strong>Get Your Free Consultation</strong></span>',
                      containerPadding: "10px",
                    },
                  },
                  {
                    id: "text_5",
                    type: "text",
                    values: {
                      containerPadding: "41px 55px 18px",
                      fontSize: "16px",
                      color: "#003399",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 20px; line-height: 32px;"><strong>Contact Us</strong></p><p>+1 123 456 7890</p><p>info@company.com</p>',
                    },
                  },
                  {
                    id: "social_1",
                    type: "social",
                    values: {
                      containerPadding: "10px 10px 33px",
                      icons: {
                        iconType: "circle-black",
                        icons: [
                          { url: "https://facebook.com/", name: "Facebook" },
                          { url: "https://linkedin.com/", name: "LinkedIn" },
                          { url: "https://instagram.com/", name: "Instagram" },
                        ],
                      },
                      align: "center",
                      iconSize: 32,
                      spacing: 17,
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#e5eaf5", padding: "0px" },
          },
          {
            id: "row_6",
            cells: [1],
            columns: [
              {
                id: "col_7",
                contents: [
                  {
                    id: "text_6",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "16px",
                      color: "#fafafa",
                      textAlign: "center",
                      lineHeight: "180%",
                      text: '<p style="font-size: 16px; line-height: 28.8px;">© 2025 [Company Name]. All Rights Reserved.</p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
        ],
        values: {
          popupWidth: "600px",
          contentWidth: "600px",
          fontFamily: {
            label: "Cabin",
            value: "'Cabin',sans-serif",
            url: "https://fonts.googleapis.com/css?family=Cabin:400,700",
          },
          textColor: "#000000",
          backgroundColor: "#f9f9f9",
          preheaderText: "Client Success Stories",
        },
      },
      schemaVersion: 20,
    },
  },
  {
    Template_6: {
      counters: {
        u_row: 6,
        u_column: 6,
        u_content_text: 8,
        u_content_image: 2,
        u_content_button: 1,
        u_content_social: 1,
      },
      body: {
        id: "SeasonalSale_006",
        rows: [
          {
            id: "row_1",
            cells: [1],
            columns: [
              {
                id: "col_1",
                contents: [
                  {
                    id: "text_1",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "14px",
                      color: "#afb0c7",
                      textAlign: "center",
                      lineHeight: "170%",
                      text: '<p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: {
              backgroundColor: "",
              columnsBackgroundColor: "",
              padding: "0px",
            },
          },
          {
            id: "row_2",
            cells: [1],
            columns: [
              {
                id: "col_2",
                contents: [
                  {
                    id: "image_1",
                    type: "image",
                    values: {
                      containerPadding: "20px",
                      src: {
                        url: "https://example.com/holiday-banner.png",
                        width: 300,
                        height: 100,
                        maxWidth: "50%",
                      },
                      textAlign: "center",
                      altText: "Holiday Banner",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_3",
            cells: [1],
            columns: [
              {
                id: "col_3",
                contents: [
                  {
                    id: "text_2",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "28px",
                      color: "#ffffff",
                      textAlign: "center",
                      lineHeight: "140%",
                      text: '<p style="font-size: 28px; line-height: 39.2px;"><strong>Black Friday Deals Are Here!</strong></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#ff0000", padding: "0px" },
          },
          {
            id: "row_4",
            cells: [1],
            columns: [
              {
                id: "col_4",
                contents: [
                  {
                    id: "text_4",
                    type: "text",
                    values: {
                      containerPadding: "33px 55px",
                      fontSize: "18px",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 18px; line-height: 28.8px;">Social Media Ads - 30% Off<br>SEO Packages - 25% Off<br>Ends Midnight!</p>',
                    },
                  },
                  {
                    id: "button_1",
                    type: "button",
                    values: {
                      href: {
                        name: "web",
                        values: {
                          href: "https://example.com/shop",
                          target: "_blank",
                        },
                      },
                      buttonColors: {
                        color: "#FFFFFF",
                        backgroundColor: "#ff6600",
                        hoverColor: "#FFFFFF",
                        hoverBackgroundColor: "#3AAEE0",
                      },
                      size: { autoWidth: true, width: "100%" },
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "14px 44px 13px",
                      borderRadius: "4px",
                      text: '<span style="font-size: 16px;"><strong>Shop Now</strong></span>',
                      containerPadding: "10px",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_5",
            cells: [1],
            columns: [
              {
                id: "col_5",
                contents: [
                  {
                    id: "text_5",
                    type: "text",
                    values: {
                      containerPadding: "41px 55px 18px",
                      fontSize: "16px",
                      color: "#003399",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 20px; line-height: 32px;"><strong>Contact Us</strong></p><p>+1 123 456 7890</p><p>info@company.com</p>',
                    },
                  },
                  {
                    id: "social_1",
                    type: "social",
                    values: {
                      containerPadding: "10px 10px 33px",
                      icons: {
                        iconType: "circle-black",
                        icons: [
                          { url: "https://facebook.com/", name: "Facebook" },
                          { url: "https://linkedin.com/", name: "LinkedIn" },
                          { url: "https://instagram.com/", name: "Instagram" },
                        ],
                      },
                      align: "center",
                      iconSize: 32,
                      spacing: 17,
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#e5eaf5", padding: "0px" },
          },
          {
            id: "row_6",
            cells: [1],
            columns: [
              {
                id: "col_6",
                contents: [
                  {
                    id: "text_6",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "16px",
                      color: "#fafafa",
                      textAlign: "center",
                      lineHeight: "180%",
                      text: '<p style="font-size: 16px; line-height: 28.8px;">© 2025 [Company Name]. All Rights Reserved.</p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
        ],
        values: {
          popupWidth: "600px",
          contentWidth: "600px",
          fontFamily: {
            label: "Cabin",
            value: "'Cabin',sans-serif",
            url: "https://fonts.googleapis.com/css?family=Cabin:400,700",
          },
          textColor: "#000000",
          backgroundColor: "#f9f9f9",
          preheaderText: "Black Friday Marketing Deals!",
        },
      },
      schemaVersion: 20,
    },
  },
  {
    Template_7: {
      counters: {
        u_row: 6,
        u_column: 6,
        u_content_text: 8,
        u_content_image: 2,
        u_content_button: 1,
        u_content_social: 1,
      },
      body: {
        id: "LeadMagnet_007",
        rows: [
          {
            id: "row_1",
            cells: [1],
            columns: [
              {
                id: "col_1",
                contents: [
                  {
                    id: "text_1",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "14px",
                      color: "#afb0c7",
                      textAlign: "center",
                      lineHeight: "170%",
                      text: '<p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: {
              backgroundColor: "",
              columnsBackgroundColor: "",
              padding: "0px",
            },
          },
          {
            id: "row_2",
            cells: [1],
            columns: [
              {
                id: "col_2",
                contents: [
                  {
                    id: "image_1",
                    type: "image",
                    values: {
                      containerPadding: "20px",
                      src: {
                        url: "https://example.com/ebook.png",
                        width: 200,
                        height: 300,
                        maxWidth: "40%",
                      },
                      textAlign: "center",
                      altText: "eBook Cover",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_3",
            cells: [1],
            columns: [
              {
                id: "col_3",
                contents: [
                  {
                    id: "text_2",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "28px",
                      color: "#ffffff",
                      textAlign: "center",
                      lineHeight: "140%",
                      text: '<p style="font-size: 28px; line-height: 39.2px;"><strong>Free Guide: 10 Marketing Hacks for 2025</strong></p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
          {
            id: "row_4",
            cells: [1],
            columns: [
              {
                id: "col_4",
                contents: [
                  {
                    id: "text_4",
                    type: "text",
                    values: {
                      containerPadding: "33px 55px",
                      fontSize: "18px",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 18px; line-height: 28.8px;">Unlock expert tips to boost your business—download your free guide now!</p>',
                    },
                  },
                  {
                    id: "button_1",
                    type: "button",
                    values: {
                      href: {
                        name: "web",
                        values: {
                          href: "https://example.com/download",
                          target: "_blank",
                        },
                      },
                      buttonColors: {
                        color: "#FFFFFF",
                        backgroundColor: "#ff6600",
                        hoverColor: "#FFFFFF",
                        hoverBackgroundColor: "#3AAEE0",
                      },
                      size: { autoWidth: true, width: "100%" },
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "14px 44px 13px",
                      borderRadius: "4px",
                      text: '<span style="font-size: 16px;"><strong>Download Now</strong></span>',
                      containerPadding: "10px",
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "#ffffff" },
              },
            ],
            values: { columnsBackgroundColor: "#ffffff", padding: "0px" },
          },
          {
            id: "row_5",
            cells: [1],
            columns: [
              {
                id: "col_5",
                contents: [
                  {
                    id: "text_5",
                    type: "text",
                    values: {
                      containerPadding: "41px 55px 18px",
                      fontSize: "16px",
                      color: "#003399",
                      textAlign: "center",
                      lineHeight: "160%",
                      text: '<p style="font-size: 20px; line-height: 32px;"><strong>Contact Us</strong></p><p>+1 123 456 7890</p><p>info@company.com</p>',
                    },
                  },
                  {
                    id: "social_1",
                    type: "social",
                    values: {
                      containerPadding: "10px 10px 33px",
                      icons: {
                        iconType: "circle-black",
                        icons: [
                          { url: "https://facebook.com/", name: "Facebook" },
                          { url: "https://linkedin.com/", name: "LinkedIn" },
                          { url: "https://instagram.com/", name: "Instagram" },
                        ],
                      },
                      align: "center",
                      iconSize: 32,
                      spacing: 17,
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#e5eaf5", padding: "0px" },
          },
          {
            id: "row_6",
            cells: [1],
            columns: [
              {
                id: "col_6",
                contents: [
                  {
                    id: "text_6",
                    type: "text",
                    values: {
                      containerPadding: "10px",
                      fontSize: "16px",
                      color: "#fafafa",
                      textAlign: "center",
                      lineHeight: "180%",
                      text: '<p style="font-size: 16px; line-height: 28.8px;">© 2025 [Company Name]. All Rights Reserved.</p>',
                    },
                  },
                ],
                values: { padding: "0px", backgroundColor: "" },
              },
            ],
            values: { columnsBackgroundColor: "#003399", padding: "0px" },
          },
        ],
        values: {
          popupWidth: "600px",
          contentWidth: "600px",
          fontFamily: {
            label: "Cabin",
            value: "'Cabin',sans-serif",
            url: "https://fonts.googleapis.com/css?family=Cabin:400,700",
          },
          textColor: "#000000",
          backgroundColor: "#f9f9f9",
          preheaderText: "Get Your Free Marketing Guide!",
        },
      },
      schemaVersion: 20,
    },
  },
];

export default templateDesigns;
