import './footer.css';
import { Logo } from '@app/components/Logo/Logo';
import testIds from '@app/utils/test-ids';

const Footer = () => (
  <footer
    className="m-h-56 leading-7 sm:p-14 font-site"
    data-testid={testIds.LAYOUT.FOOTER}
  >
    <div className="flex flex-col sm:flex-row">
      <div className="basis-2/3 bg-blue-site text-white p-14 sm:pl-44">
        <h2 className="text-2xl sm:text-3xl font-bold">CONTACT US</h2>
        <div className="flex flex-col sm:flex-row text-sm font-helvetica">
          <div className="basis-1/3 border-b border-white pb-4">
            <p className="mt-10">
            Feel free to get in touch with us. We're here to assist you!
            </p>
            <p className="mt-10">Registered Company: 12345-67</p>
          </div>
          <div className="basis-1/3"></div>
          <div className="basis-1/2 border-b border-white pb-4">
            <p className="mt-10">
              171/16, Lihiniya Mw,
              <br /> Battaramulla, Colombo,
              <br /> Sri Lanka
            </p>
            <p className="mt-10">Phone: 94-777-965-826</p>
          </div>
        </div>
        <h3 className="text-4xl mt-10">info@harnslab.com</h3>
      </div>
      <div className="basis-1/3 bg-gray-200 p-14 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Get Templates Now!</h2>
        <p className="mt-6">Share your email with us and we’ll send our templates for you to select.</p>
        <input
          type="email"
          className="my-6 w-3/4 block mx-auto bg-transparent border-0 border-b border-blue-site text-blue-site"
          placeholder="Email Address"
        />
        <a href="" className="text-purple-site py-6 font-site">
          Send Now
        </a>
      </div>
    </div>
    <div className="mx-auto text-center sm:text-xs mt-6">
      <Logo />
      <p className="font-default mb-10">
        © 2024 HarnsLab (Pvt) Ltd. Hosted by Vercel
      </p>
    </div>
  </footer>
);

export default Footer;
