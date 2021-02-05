import { ThemeConsumer } from '../contexts/theme';

export default function About() {
  const technologies = [
    { name: 'React js', link: 'https://reactjs.org/' },
    {
      name: 'Nelify Serverless Functions',
      link: 'https://www.netlify.com/products/functions/',
    },
    { name: 'Cheerio js', link: 'https://cheerio.js.org/' },
  ];
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`about-container ${theme}`}>
          <h3>
            Made with ❤️ by{' '}
            <a
              href='https://twitter.com/SrikarVks'
              target='_blank'
              rel='noreferrer'
            >
              <span className='no-break'>Srikar KSV</span>
            </a>
          </h3>
          <h5>
            Link to the source code :{' '}
            <a
              href='https://github.com/SrikarKSV/github-trends'
              target='_blank'
              rel='noreferrer'
            >
              <span className='no-break'>GitHub Trends</span>
            </a>
          </h5>
          <p>Technologies used :</p>
          <ul>
            {technologies.map((technology) => (
              <li key={technology.name}>
                <a target='_blank' rel='noreferrer' href={technology.link}>
                  {technology.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ThemeConsumer>
  );
}
