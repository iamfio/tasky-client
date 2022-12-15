import { Link } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  return (
    <>
      <div className="mt-4 hero border-8 border-secondary rounded-lg h-96 bg-violet-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-primary ">
                Tasky!
              </span>
            </h1>
            <p className="py-6 text-xl">
              Yet another small tool for big decisions.
            </p>
            <button className="btn text-white bg-gradient-to-r from-pink-500 to-secondary border-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-secondary hover:to-pink-500">
              <Link to={'signup'}>Get Started</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="m-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2 bg-clip-text text-primary">Check In</h1>
        </div>
        <div className="text-center mb-4">
          <a
            href="https://github.com/iamfio/Tasky/raw/main/client/dist/Tasky-v1.0.zip"
            className="text-2xl text-violet-600 underline"
          >
            DOWNLOAD LINK
          </a>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="border-2 border-warning rounded-lg">
            <div className="p-2">
              <h4 className="font-mono underline underline-offset-2 text-center text-xl">
                How-To
              </h4>
              <ul className="steps steps-vertical text-sm font-mono">
                <li className="step step-primary">Register</li>
                <li className="step step-secondary">Create and save Task</li>
                <li className="step step-success">Edit Task to set alarm</li>
                <li className="step  step-accent">Install Chrome Extension</li>
              </ul>
            </div>
          </div>
          <div className="border-2 border-warning rounded-lg">
            <div className="p-2">
              <h4 className="font-mono underline underline-offset-2 text-center text-xl">
                Install
              </h4>
              <ul className="steps steps-vertical text-sm font-mono">
                <li className="step step-primary">Download extension</li>
                <li className="step step-secondary">
                  <ul className="text-left list-disc ml-4">
                    <li>Settings</li>
                    <li>Extensions</li>
                    <li>Turn "Developer Mode" ON</li>
                  </ul>
                </li>
                <li className="step step-success">
                  Unpack ZIP and drop folder on screen
                </li>
                <li className="step  step-accent">Enjoy your Tasky</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
