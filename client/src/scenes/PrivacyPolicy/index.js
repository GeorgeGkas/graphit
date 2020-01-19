import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  container: {
    width: '80%',
    margin: '0 auto',
    display: 'block',
    padding: '60px 0 20px 0',
    background: '#fff',
  },
  homeLink: {
    textDecoration: 'underline',
    color: blue['800'],
    paddingBottom: '15px',
    display: 'block',
    fontWeight: 700,
    letterSpacing: '1px',
  },
  wrapper: {
    background: '#fff',
  },
  link: {
    textDecoration: 'none',
    color: blue['800'],
  },
  TOClist: {
    listStyle: 'none',
    paddingBottom: '5px',
  },
}))

const PrivacyPolicy = () => {
  const classes = useStyles()

  React.useEffect(() => {
    // Decode entities in the URL
    // Sometimes a URL like #/foo#bar will be encoded as #/foo%23bar
    window.location.hash = window.decodeURIComponent(window.location.hash)
    const scrollToAnchor = () => {
      const hashParts = window.location.hash.split('#')
      if (hashParts.length > 2) {
        const hash = hashParts.slice(-1)[0]
        document.querySelector(`#${hash}`).scrollIntoView()
      }
    }
    scrollToAnchor()
    window.onhashchange = scrollToAnchor
  })

  return (
    <div className={classes.wrapper}>
      <main className={classes.container}>
        <Link className={classes.homeLink} to="/">
          Back to Home
        </Link>
        <Typography gutterBottom align="left" component="h1" variant="h3">
          PRIVACY POLICY
        </Typography>
        <Typography paragraph align="left" component="p" variant="subtitle2">
          Last updated January 19, 2020
        </Typography>
        <section>
          <Typography paragraph align="left" component="p" variant="body2">
            Thank you for choosing to be part of our community at
            graphit.web.app (“Company”, “we”, “us”, or “our”). We are committed
            to protecting your personal information and your right to privacy.
            If you have any questions or concerns about our policy , or our
            practices with regards to your personal information, please contact
            us at{' '}
            <a className={classes.link} href="mailto:georgegkas@gmail.com">
              georgegkas@gmail.com
            </a>
            .
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            When you visit our website{' '}
            <a className={classes.link} href="https://graphit.web.app/">
              https://graphit.web.app/
            </a>
            , and use our services, you trust us with your personal information.
            We take your privacy very seriously. In this privacy policy, we seek
            to explain to you in the clearest way possible what information we
            collect, how we use it and what rights you have in relation to it.
            We hope you take some time to read through it carefully, as it is
            important. If there are any terms in this privacy policy that you do
            not agree with, please discontinue use of our Sites and our
            services. 
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            This privacy policy applies to all information collected through our
            website (such as https://graphit.web.app/), and/or any related
            services, sales, marketing or events (we refer to them collectively
            in this privacy policy as the "Services").  
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle2">
            Please read this privacy policy carefully as it will help you make
            informed decisions about sharing your personal information with us.
          </Typography>
        </section>
        <nav>
          <Typography gutterBottom align="left" component="h1" variant="h4">
            TABLE OF CONTENTS 
          </Typography>
          <ul>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#1">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  WHAT INFORMATION DO WE COLLECT?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#2">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  HOW DO WE USE YOUR INFORMATION?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#3">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  WILL YOUR INFORMATION BE SHARED WITH ANYONE?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#4">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  WHO WILL YOUR INFORMATION BE SHARED WITH?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#5">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#6">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#7">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  HOW LONG DO WE KEEP YOUR INFORMATION?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#8">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  HOW DO WE KEEP YOUR INFORMATION SAFE?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#9">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  DO WE COLLECT INFORMATION FROM MINORS?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#10">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  WHAT ARE YOUR PRIVACY RIGHTS?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#11">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  DATA BREACH
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#12">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  CONTROLS FOR DO-NOT-TRACK FEATURES
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#13">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  DO WE MAKE UPDATES TO THIS POLICY?
                </Typography>
              </a>
            </li>
            <li className={classes.TOClist}>
              <a className={classes.link} href="#14">
                <Typography
                  gutterBottom
                  align="left"
                  component="p"
                  variant="subtitle2"
                >
                  HOW CAN YOU CONTACT US ABOUT THIS POLICY?
                </Typography>
              </a>
            </li>
          </ul>
        </nav>
        <article id="1">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            WHAT INFORMATION DO WE COLLECT?
          </Typography>
          <section>
            <Typography gutterBottom align="left" component="h1" variant="h5">
              Personal information you disclose to us
            </Typography>
            <Typography
              paragraph
              align="left"
              component="p"
              variant="subtitle1"
            >
              <em>
                In Short: We collect personal information that you provide to us
                such as contact information, security data, and social media
                login data.
              </em>
            </Typography>
            <Typography paragraph align="left" component="p" variant="body2">
              We collect personal information that you voluntarily provide to us
              when registering at the Services expressing an interest in
              obtaining information about us or our products and services, when
              participating in activities on the Services or otherwise
              contacting us
            </Typography>
            <Typography paragraph align="left" component="p" variant="body2">
              The personal information that we collect depends on the context of
              your interactions with us and the Services, the choices you make
              and the products and features you use. The personal information we
              collect can include the following:
            </Typography>
            <ul>
              <li>
                <Typography
                  paragraph
                  align="left"
                  component="p"
                  variant="body2"
                >
                  <strong>Publicly Available Personal Information.</strong>{' '}
                  &nbsp;
                  <span>
                    We collect email addresses; social media; and other similar
                    data.
                  </span>
                </Typography>
              </li>
              <li>
                <Typography
                  paragraph
                  align="left"
                  component="p"
                  variant="body2"
                >
                  <strong>Personal Information Provided by You.</strong> &nbsp;
                  <span>We collect app usage; and other similar data.</span>
                </Typography>
              </li>
              <li>
                <Typography
                  paragraph
                  align="left"
                  component="p"
                  variant="body2"
                >
                  <strong>Social Media Login Data.</strong> &nbsp;
                  <span>
                    We provide you with the option to register using social
                    media account details, specifically your Google account. If
                    you choose to register, we will collect the Information
                    described in the section called "HOW DO WE HANDLE YOUR
                    SOCIAL LOGINS" below.
                  </span>
                </Typography>
              </li>
            </ul>
            <Typography paragraph align="left" component="p" variant="body2">
              All personal information that you provide to us must be true,
              complete and accurate, and you must notify us of any changes to
              such personal information.
            </Typography>
          </section>
          <section>
            <Typography gutterBottom align="left" component="h1" variant="h5">
              Information automatically collected
            </Typography>
            <Typography
              paragraph
              align="left"
              component="p"
              variant="subtitle1"
            >
              <em>
                In Short: Some information – such as IP address and/or browser
                and device characteristics – is collected automatically when you
                visit our Services.
              </em>
            </Typography>
            <Typography paragraph align="left" component="p" variant="body2">
              We automatically collect certain information when you visit, use
              or navigate the Services. This information does not reveal your
              specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address,
              browser and device characteristics, operating system, language
              preferences, referring URLs, device name, country, location,
              information about how and when you use our Services and other
              technical information. This information is primarily needed to
              maintain the security and operation of our Services, and for our
              internal analytics and reporting purposes.
            </Typography>
            <Typography paragraph align="left" component="p" variant="body2">
              Like many businesses, we also collect information through cookies
              and similar technologies.
            </Typography>
            <ul>
              <li>
                <Typography
                  paragraph
                  align="left"
                  component="p"
                  variant="body2"
                >
                  <strong>Online Identifiers.</strong> &nbsp;
                  <span>
                    We collect devices; tools and protocols, such as IP
                    (Internet Protocol) addresses; cookie identifiers, or others
                    such as the ones used for analytics and marketing; and other
                    similar data.
                  </span>
                </Typography>
              </li>
            </ul>
          </section>
        </article>
        <article id="2">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            HOW DO WE USE YOUR INFORMATION?
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle1">
            <em>
              In Short:  We process your information for purposes based on
              legitimate business interests, the fulfillment of our contract
              with you, compliance with our legal obligations, and/or your
              consent.
            </em>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            We use personal information collected via our Services for a variety
            of business purposes described below. We process your personal
            information for these purposes in reliance on our legitimate
            business interests, in order to enter into or perform a contract
            with you, with your consent, and/or for compliance with our legal
            obligations. We indicate the specific processing grounds we rely on
            next to each purpose listed below.
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            We use the information we collect or receive:
          </Typography>
          <ul>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>
                  To facilitate account creation and logon process.
                </strong>{' '}
                &nbsp;
                <span>
                  If you choose to link your account with us to a third party
                  account (such as your Google account), we use the information
                  you allowed us to collect from those third parties to
                  facilitate account creation and logon process for the
                  performance of the contract. See the section below headed "HOW
                  DO WE HANDLE YOUR SOCIAL LOGINS" for further information.
                </span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>For other Business Purposes.</strong> &nbsp;
                <span>
                  We may use your information for other Business Purposes, such
                  as data analysis, identifying usage trends, determining the
                  effectiveness of our promotional campaigns and to evaluate and
                  improve our Services, products, marketing and your
                  experience. We may use and store this information in
                  aggregated and anonymized form so that it is not associated
                  with individual end users and does not include personal
                  information. We will not use identifiable personal information
                  without your consent.
                </span>
              </Typography>
            </li>
          </ul>
        </article>
        <article id="3">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            WILL YOUR INFORMATION BE SHARED WITH ANYONE?
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle1">
            <em>
              In Short:  We only share information with your consent, to comply
              with laws, to provide you with services, to protect your rights,
              or to fulfill business obligations.
            </em>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            We may process or share data based on the following legal basis:
          </Typography>
          <ul>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Consent:</strong> &nbsp;
                <span>
                  We may process your data if you have given us specific consent
                  to use your personal information in a specific purpose.
                </span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Legitimate Interests:</strong> &nbsp;
                <span>
                  We may process your data when it is reasonably necessary to
                  achieve our legitimate business interests.
                </span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Performance of a Contract:</strong> &nbsp;
                <span>
                  Where we have entered into a contract with you, we may process
                  your personal information to fulfill the terms of our
                  contract.
                </span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Legal Obligations:</strong> &nbsp;
                <span>
                  We may disclose your information where we are legally required
                  to do so in order to comply with applicable law, governmental
                  requests, a judicial proceeding, court order, or legal
                  process, such as in response to a court order or a subpoena
                  (including in response to public authorities to meet national
                  security or law enforcement requirements).
                </span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Vital Interests:</strong> &nbsp;
                <span>
                  We may disclose your information where we believe it is
                  necessary to investigate, prevent, or take action regarding
                  potential violations of our policies, suspected fraud,
                  situations involving potential threats to the safety of any
                  person and illegal activities, or as evidence in litigation in
                  which we are involved.
                </span>
              </Typography>
            </li>
          </ul>
          <Typography paragraph align="left" component="p" variant="body2">
            More specifically, we may need to process your data or share your
            personal information in the following situations:
          </Typography>
          <ul>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>
                  Vendors, Consultants and Other Third-Party Service Providers.
                </strong>{' '}
                &nbsp;
                <span>
                  We may share your data with third party vendors, service
                  providers, contractors or agents who perform services for us
                  or on our behalf and require access to such information to do
                  that work. Examples include: payment processing, data
                  analysis, email delivery, hosting services, customer service
                  and marketing efforts. We may allow selected third parties to
                  use tracking technology on the Services, which will enable
                  them to collect data about how you interact with the Services
                  over time. This information may be used to, among other
                  things, analyze and track data, determine the popularity of
                  certain content and better understand online activity. Unless
                  described in this Policy, we do not share, sell, rent or trade
                  any of your information with third parties for their
                  promotional purposes.  We have contracts in place with our
                  data processors. This means that they cannot do anything with
                  your personal information unless we have instructed them to do
                  it. They will not share your personal information with any
                  organisation apart from us. They will hold it securely and
                  retain it for the period we instruct.
                </span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Business Transfers.</strong> &nbsp;
                <span>
                  We may share or transfer your information in connection with,
                  or during negotiations of, any merger, sale of company assets,
                  financing, or acquisition of all or a portion of our business
                  to another company.
                </span>
              </Typography>
            </li>
          </ul>
        </article>
        <article id="4">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            WHO WILL YOUR INFORMATION BE SHARED WITH?
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle1">
            <em>
              In Short:  We only share information with the following third
              parties.
            </em>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            We only share and disclose your information with the following third
            parties. We have categorized each party so that you may be easily
            understand the purpose of our data collection and processing
            practices. If we have processed your data based on your consent and
            you wish to revoke your consent, please contact us.
          </Typography>
          <ul>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>
                  Allow Users to Connect to their Third-Party Accounts
                </strong>{' '}
                &nbsp;
                <span>Google account</span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Cloud Computing Services</strong> &nbsp;
                <span>Google Cloud Platform</span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Functionality and Infrastructure Optimization</strong>{' '}
                &nbsp;
                <span>
                  Cloud Functions for Firebase , Firebase Hosting and Cloud
                  Firestore
                </span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>User Account Registration and Authentication</strong>{' '}
                &nbsp;
                <span>Google OAuth 2.0</span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Web and Mobile Analytics</strong> &nbsp;
                <span>Google Analytics for Firebase</span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Website Hosting</strong> &nbsp;
                <span>Firebase Hosting</span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Website Performance Monitoring</strong> &nbsp;
                <span>
                  Firebase Crash Reporting and Firebase Performance Monitoring
                </span>
              </Typography>
            </li>
            <li>
              <Typography paragraph align="left" component="p" variant="body2">
                <strong>Website Testing</strong> &nbsp;
                <span>Firebase Remote Config</span>
              </Typography>
            </li>
          </ul>
        </article>
        <article id="5">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle1">
            <em>
              In Short:  We may use cookies and other tracking technologies to
              collect and store your information.
            </em>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body1">
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information.
          </Typography>
        </article>
        <article id="6">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            HOW DO WE HANDLE YOUR SOCIAL LOGINS?
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle1">
            <em>
              In Short:  If you choose to register or log in to our services
              using a social media account, we may have access to certain
              information about you.
            </em>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            Our Services offer you the ability to register and login using your
            third party social media account details (like your Google logins).
            Where you choose to do this, we will receive certain profile
            information about you from your social media provider. The profile
            Information we receive include only your name, e-mail address,
            profile picture as well as other information you choose to make
            public.
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            We will use the information we receive only for the purposes that
            are described in this privacy policy or that are otherwise made
            clear to you on the Services. Please note that we do not control,
            and are not responsible for, other uses of your personal information
            by your third party social media provider. We recommend that you
            review their privacy policy to understand how they collect, use and
            share your personal information, and how you can set your privacy
            preferences on their sites and apps.
          </Typography>
        </article>
        <article id="7">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            HOW LONG DO WE KEEP YOUR INFORMATION?
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle1">
            <em>
              In Short:  We keep your information for as long as necessary to
              fulfill the purposes outlined in this privacy policy unless
              otherwise required by law.
            </em>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy policy, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting or other legal requirements). No purpose in this
            policy will require us keeping your personal information for longer
            than the period of time in which users have an account with us.
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymize it, or, if
            this is not possible (for example, because your personal information
            has been stored in backup archives), then we will securely store
            your personal information and isolate it from any further processing
            until deletion is possible. 
          </Typography>
        </article>
        <article id="8">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            HOW DO WE KEEP YOUR INFORMATION SAFE?
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle1">
            <em>
              In Short:  We aim to protect your personal information through a
              system of organizational and technical security measures.
            </em>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            We have implemented appropriate technical and organizational
            security measures designed to protect the security of any personal
            information we process. However, please also remember that we cannot
            guarantee that the internet itself is 100% secure. Although we will
            do our best to protect your personal information, transmission of
            personal information to and from our Services is at your own risk.
            You should only access the services within a secure environment.
          </Typography>
        </article>
        <article id="9">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            DO WE COLLECT INFORMATION FROM MINORS?
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle1">
            <em>
              In Short:  We do not knowingly collect data from or market to
              children under 18 years of age.
            </em>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            We do not knowingly solicit data from or market to children under 18
            years of age. By using the Services, you represent that you are at
            least 18 or that you are the parent or guardian of such a minor and
            consent to such minor dependent’s use of the Services. If we learn
            that personal information from users less than 18 years of age has
            been collected, we will deactivate the account and take reasonable
            measures to promptly delete such data from our records. If you
            become aware of any data we have collected from children under age
            18, please contact us at georgegkas@gmail.com.
          </Typography>
        </article>
        <article id="10">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            WHAT ARE YOUR PRIVACY RIGHTS?
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle1">
            <em>
              In Short:  In some regions, such as the European Economic Area,
              you have rights that allow you greater access to and control over
              your personal information. You may review, change, or terminate
              your account at any time.
            </em>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            In some regions (like the European Economic Area), you have certain
            rights under applicable data protection laws. These may include the
            right (i) to request access and obtain a copy of your personal
            information, (ii) to request rectification or erasure; (iii) to
            restrict the processing of your personal information; and (iv) if
            applicable, to data portability. In certain circumstances, you may
            also have the right to object to the processing of your personal
            information. To make such a request, please use the contact
            details provided below. We will consider and act upon any request in
            accordance with applicable data protection laws.
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            If we are relying on your consent to process your personal
            information, you have the right to withdraw your consent at any
            time. Please note however that this will not affect the lawfulness
            of the processing before its withdrawal.
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            If you are resident in the European Economic Area and you believe we
            are unlawfully processing your personal information, you also have
            the right to complain to your local data protection supervisory
            authority. You can find their contact details here: 
            <a
              className={classes.link}
              href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
            >
              http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
            </a>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            If you have questions or comments about your privacy rights, you may
            email us at georgegkas@gmail.com.
          </Typography>
          <section>
            <Typography gutterBottom align="left" component="h1" variant="h5">
              Account Information
            </Typography>
            <Typography paragraph align="left" component="p" variant="body2">
              If you would at any time like to review or change the information
              in your account or terminate your account, you can:
            </Typography>
            <ul>
              <li>
                <Typography
                  paragraph
                  align="left"
                  component="p"
                  variant="body2"
                >
                  Contact us using the contact information provided.
                </Typography>
              </li>
            </ul>
          </section>
          <section>
            <Typography gutterBottom align="left" component="h1" variant="h5">
              Cookies and similar technologies
            </Typography>
            <Typography paragraph align="left" component="p" variant="body2">
              Most Web browsers are set to accept cookies by default. If you
              prefer, you can usually choose to set your browser to remove
              cookies and to reject cookies. If you choose to remove cookies or
              reject cookies, this could affect certain features or services of
              our Services. To opt-out of interest-based advertising by
              advertisers on our Services visit 
              <a
                className={classes.link}
                href="http://www.aboutads.info/choices/"
              >
                http://www.aboutads.info/choices/
              </a>
              .
            </Typography>
          </section>
          <section>
            <Typography gutterBottom align="left" component="h1" variant="h5">
              Opting out of email marketing
            </Typography>
            <Typography paragraph align="left" component="p" variant="body2">
              You can unsubscribe from our marketing email list at any time by
              clicking on the unsubscribe link in the emails that we send or by
              contacting us using the details provided below. You will then be
              removed from the marketing email list – however, we will still
              need to send you service-related emails that are necessary for the
              administration and use of your account. To otherwise opt-out, you
              may:
            </Typography>
            <ul>
              <li>
                <Typography
                  paragraph
                  align="left"
                  component="p"
                  variant="body2"
                >
                  Contact us using the contact information provided.
                </Typography>
              </li>
            </ul>
          </section>
        </article>
        <article id="11">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            DATA BREACH
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            A privacy breach occurs when there is unauthorized access to or
            collection, use, disclosure or disposal of personal information. You
            will be notified about data breaches when graphit.web.app believes
            you are likely to be at risk or serious harm. For example, a data
            breach may be likely to result in serious financial harm or harm to
            your mental or physical well-being. In the event that
            graphit.web.app becomes aware of a security breach which has
            resulted or may result in unauthorized access, use or disclosure of
            personal information graphit.web.app will promptly investigate the
            matter and notify the applicable Supervisory Authority not later
            than 72 hours after having become aware of it, unless the personal
            data breach is unlikely to result in a risk to the rights and
            freedoms of natural persons.
          </Typography>
        </article>
        <article id="12">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            CONTROLS FOR DO-NOT-TRACK FEATURES
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track (“DNT”) feature or setting you
            can activate to signal your privacy preference not to have data
            about your online browsing activities monitored and collected. No
            uniform technology standard for recognizing and implementing DNT
            signals has been finalized. As such, we do not currently respond to
            DNT browser signals or any other mechanism that automatically
            communicates your choice not to be tracked online. If a standard for
            online tracking is adopted that we must follow in the future, we
            will inform you about that practice in a revised version of this
            privacy policy.
          </Typography>
        </article>
        <article id="13">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            DO WE MAKE UPDATES TO THIS POLICY? 
          </Typography>
          <Typography paragraph align="left" component="p" variant="subtitle1">
            <em>
              In Short:  Yes, we will update this policy as necessary to stay
              compliant with relevant laws.
            </em>
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            We may update this privacy policy from time to time. The updated
            version will be indicated by an updated “Revised” date and the
            updated version will be effective as soon as it is accessible. If we
            make material changes to this privacy policy, we may notify you
            either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy policy frequently to be informed of how we are protecting
            your information.
          </Typography>
        </article>
        <article id="14">
          <Typography gutterBottom align="left" component="h1" variant="h4">
            HOW CAN YOU CONTACT US ABOUT THIS POLICY?
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            If you have questions or comments about this policy, you may email
            us at georgegkas@gmail.com
          </Typography>
        </article>
        <article>
          <Typography gutterBottom align="left" component="h1" variant="h4">
            HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
          </Typography>
          <Typography paragraph align="left" component="p" variant="body2">
            Based on the laws of some countries, you may have the right to
            request access to the personal information we collect from you,
            change that information, or delete it in some circumstances. To
            request to review, update, or delete your personal information,
            please submit a request ticket by contacting us directly using the
            contact information provided. We will respond to your request within
            30 days.
          </Typography>
        </article>
      </main>
    </div>
  )
}

export default PrivacyPolicy
