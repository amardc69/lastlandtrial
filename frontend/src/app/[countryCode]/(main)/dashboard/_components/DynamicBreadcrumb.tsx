"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

// Mapping for breadcrumb names
const breadcrumbNameMap: { [key: string]: string } = {
  'dashboard': 'Dashboard',
  'business-operations': 'Business Operations',
  'google-reviews': 'Google Reviews',
  'seo-blogs': 'SEO Blogs',
  'consultations': 'Consultations',
  'indian-penal-code': 'Indian Penal Code',
  'indian-acts': 'Indian Acts',
  'legals': 'Legals',
  'accountants': 'Accountants',
  'gst-guide': 'GST Guide',
  'settings': 'Settings',
  'general': 'General',
  'team': 'Team',
  'billing': 'Billing',
  'limits': 'Limits',
  'support': 'Support',
  'feedback': 'Feedback',
  'account': 'Account',
  'user': 'User',
  'the-social-media': 'The Social Media',
}

// List of country codes to ignore
const ignoredSegments = new Set(['in', 'us', 'jp', 'uk', 'ca', 'au', 'de', 'fr', 'cn', 'br'])

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  const rawSegments = pathname.split('/').filter(seg => seg)

  // Process segments: remove ignored country codes
  const pathSegments = rawSegments.filter(seg => !ignoredSegments.has(seg.toLowerCase()))

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')

    // Keep usernames (starting with @) fully lowercase
    const isUsername = segment.startsWith('@')
    const title = isUsername
      ? segment.toLowerCase() // Ensure username stays lowercase
      : breadcrumbNameMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())

    return { href, title }
  })

  // Ensure 'Dashboard' is always the first breadcrumb if relevant
  const isDashboard = pathSegments[0] === 'dashboard'
  const fullBreadcrumbs = isDashboard
    ? [{ href: '/dashboard', title: 'Dashboard' }, ...breadcrumbs.slice(1)]
    : breadcrumbs

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {fullBreadcrumbs.map((crumb, index) => {
          const isLast = index === fullBreadcrumbs.length - 1
          return (
            <li key={crumb.href} className="flex items-center">
              <Link href={crumb.href} className={`text-sm ${isLast ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}>
                {crumb.title}
              </Link>
              {index < fullBreadcrumbs.length - 1 && (
                <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
