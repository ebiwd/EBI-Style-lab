/**
 * Once an announcement has been matched to the current page, show it (if there is one).
 * @param {Object} message - The message you wish to show on the page.
 * @param {string} message.headline - The headline to show (text)
 * @param {string} message.message - The contents of the message (HTML)
 * @param {string} [message.priority = 'callout'] - Optional class to add to message box. 'alert', 'warning', 'industry-background white-color'
 * @example
 *   ebiInjectAnnouncements({ headline: 'Your headline here', message: 'this', priority: 'alert' });
 */

ebiInjectAnnouncements({ headline: 'Your announcement here', message: 'Your message here', priority: 'alert' });
