interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Oxycors - A cors proxy server',
    description: `Sick of having to deal with those annoying CORS issues when you try to stream your files?
    Be it Hls/Dash livestream or static images, videos or scripts, let oxycors handle the rest. 
    Headache—seamless streaming starts here! 🎥✨`,
    imgSrc: '/static/images/project/oxycors.png',
    href: 'https://github.com/shrkwy/oxycors',
  },
]

export default projectsData
