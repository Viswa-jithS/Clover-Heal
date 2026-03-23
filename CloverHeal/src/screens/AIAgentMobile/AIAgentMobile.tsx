import React, { useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Badge } from "../../components/Badge";
import { BenefitCard } from "../../components/BenefitCard";
import { BrandsLogos } from "../../components/BrandsLogos";
import { Button } from "../../components/Button";
import { Check } from "../../components/Check";
import { Faq } from "../../components/Faq";
import { FeaturesCard } from "../../components/FeaturesCard";
import { InputIcons } from "../../components/InputIcons";
import { PricingCard } from "../../components/PricingCard";
import { Quote } from "../../components/Quote";
import { SocialMediaIcons } from "../../components/SocialMediaIcons";
import { Toggle } from "../../components/Toggle";
import Spline from '@splinetool/react-spline';
import { useInView } from "react-intersection-observer";

export const AiAgentMobile = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const [isYearly, setIsYearly] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Calculate prices based on billing cycle
  const basicPrice = isYearly ? 19 : Math.round(19 * 1.2);
  const proPrice = isYearly ? 49 : Math.round(49 * 1.2);
  const enterprisePrice = isYearly ? 89 : Math.round(89 * 1.2);

  const handleToggleClick = () => {
    setIsYearly(!isYearly);
  };

  // Intersection observer hooks for animations
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust this value as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center pt-4 pb-0 px-0 justify-center bg-color-dark-1000 relative ${screenWidth < 920 ? "min-w-[375px]" : (screenWidth >= 920) ? "min-w-[920px]" : ""}`}
      data-model-id="6018:409"
    >
      <div
        className={`border border-solid border-color-light-250 w-full flex items-center flex-[0_0_auto] pt-[var(--spacing-spacing-md)] pr-[var(--spacing-spacing-lg)] pb-[var(--spacing-spacing-md)] pl-[var(--spacing-spacing-lg)] rounded-lg justify-between bg-color-light-50 relative ${screenWidth < 920 ? "max-w-xs" : (screenWidth >= 920) ? `max-w-[${isScrolled ? '478px' : '620px'}]` : ""} animate-fadeIn sticky top-4 z-50 backdrop-blur-md transition-all duration-300 ease-in`}
      >
        <img
          className="w-[110px] object-cover h-6 relative"
          alt="Logo"
          src={
            screenWidth >= 920
              ? "/assets/logo-1.svg"
              : screenWidth < 920
                ? "/assets/logo.svg"
                : undefined
          }
        />

        {screenWidth < 920 && (
          <InputIcons
            className="!relative !left-[unset] !top-[unset]"
            property1="menu"
            propertyMenuSize="/assets/input-icons-9.svg"
            size="big" propertyChevron={""} propertyUserSize={""} propertyArrowUp={""} propertyZapSize={""}          />
        )}

        {screenWidth >= 920 && (
          <div className="inline-flex items-center gap-[var(--spacing-spacing-xl)] relative flex-[0_0_auto] rounded-[20px]">
            <button className="all-[unset] box-border inline-flex items-center justify-center gap-1 relative flex-[0_0_auto] rounded-lg">
              <button className="all-[unset] box-border relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-750 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                Home
              </button>
            </button>

            <button className="all-[unset] box-border inline-flex items-center justify-center gap-1 relative flex-[0_0_auto] rounded-lg">
              <button className="all-[unset] box-border relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-750 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                Features
              </button>
            </button>

            <button className="all-[unset] box-border inline-flex items-center justify-center gap-1 relative flex-[0_0_auto] rounded-lg">
              <button className="all-[unset] box-border relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-750 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                Pricing
              </button>
            </button>

            <button className="all-[unset] box-border inline-flex h-8 items-center justify-center gap-1 px-4 py-2.5 relative flex-[0_0_auto] bg-color-light-50 rounded-lg border border-solid border-color-light-250">
              <button className="all-[unset] box-border relative w-fit mt-[-3.00px] mb-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-750 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                Get Started
              </button>
            </button>
          </div>
        )}
      </div>

      <div
        className={`w-full flex self-stretch flex-col items-center gap-[var(--spacing-spacing-4xl)] flex-[0_0_auto] relative overflow-hidden ${screenWidth < 920 ? "pt-[var(--spacing-spacing-4xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)]" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-4xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-3xl)] pl-[var(--spacing-spacing-xl)]" : ""}`}
      >
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-0">
          <Spline
            scene="https://prod.spline.design/9EDB-a15p-uCY7IH/scene.splinecode" 
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div
          className={`w-full flex flex-col items-center max-w-[920px] flex-[0_0_auto] relative z-10 ${screenWidth < 920 ? "gap-[42px]" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-xl)]" : ""} ${screenWidth < 920 ? "px-6 py-0" : (screenWidth >= 920) ? "pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-0" : ""} animate-fadeIn animate-delay-300`}
        >
          <Badge label="AI Solution" showIcon={false} state="default" className="animate-fadeIn animate-delay-400" />
          <div
            className={`w-full flex flex-col items-start max-w-[860px] flex-[0_0_auto] relative ${screenWidth < 920 ? "gap-4" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-sm)]" : ""}`}
          >
            <div
              className={`relative self-stretch ${screenWidth < 920 ? "flex" : ""} ${screenWidth >= 920 ? "mt-[-1.00px]" : ""} ${screenWidth >= 920 ? "[font-style:var(--headline-h2-font-style)]" : ""} ${screenWidth < 920 ? "items-start" : ""} ${screenWidth < 920 ? "flex-[0_0_auto]" : ""} ${screenWidth >= 920 ? "text-transparent" : ""} ${screenWidth >= 920 ? "font-headline-h2" : ""} ${screenWidth >= 920 ? "leading-[var(--headline-h2-line-height)]" : ""} ${screenWidth < 920 ? "w-full" : ""} ${screenWidth < 920 ? "flex-col" : ""} ${screenWidth >= 920 ? "font-[number:var(--headline-h2-font-weight)]" : ""} ${screenWidth >= 920 ? "text-center" : ""} ${screenWidth >= 920 ? "[-webkit-text-fill-color:transparent]" : ""} ${screenWidth >= 920 ? "bg-[linear-gradient(180deg,rgba(255,135,71,1)_0%,rgba(23,23,23,0.1)_100%)]" : ""} ${screenWidth >= 920 ? "text-[length:var(--headline-h2-font-size)]" : ""} ${screenWidth < 920 ? "gap-3" : ""} ${screenWidth >= 920 ? "[text-fill-color:transparent]" : ""} ${screenWidth >= 920 ? "tracking-[var(--headline-h2-letter-spacing)]" : ""} ${screenWidth >= 920 ? "[-webkit-background-clip:text]" : ""} ${screenWidth >= 920 ? "bg-clip-text" : ""}`}
            >
              {screenWidth < 920 && (
                <div className="self-stretch mt-[-1.00px] bg-[linear-gradient(180deg,rgba(255,135,71,1)_0%,rgba(23,23,23,0.1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] text-transparent text-[length:var(--headline-h4-font-size)] tracking-[var(--headline-h4-letter-spacing)] leading-[var(--headline-h4-line-height)] relative font-headline-h4 font-[number:var(--headline-h4-font-weight)] text-center [font-style:var(--headline-h4-font-style)]">
                  Meet your AI Agent
                </div>
              )}

              {screenWidth >= 920 && <>Meet your AI Agent</>}
            </div>

            <p
              className={`self-stretch text-center relative ${screenWidth < 920 ? "font-body-MD" : (screenWidth >= 920) ? "font-body-LG" : ""} ${screenWidth < 920 ? "tracking-[var(--body-MD-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--body-LG-letter-spacing)]" : ""} ${screenWidth < 920 ? "[font-style:var(--body-MD-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--body-LG-font-style)]" : ""} ${screenWidth < 920 ? "text-[length:var(--body-MD-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--body-LG-font-size)]" : ""} ${screenWidth < 920 ? "text-color-light-500" : (screenWidth >= 920) ? "text-color-light-750" : ""} ${screenWidth < 920 ? "font-[number:var(--body-MD-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--body-LG-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--body-MD-line-height)]" : (screenWidth >= 920) ? "leading-[var(--body-LG-line-height)]" : ""}`}
            >
              Redefining possibilities, join the forefront of innovation.
            </p>
          </div>

          <div
            className={`items-start flex-[0_0_auto] relative ${screenWidth < 920 ? "w-full" : ""} ${screenWidth < 920 ? "flex" : (screenWidth >= 920) ? "inline-flex" : ""} ${screenWidth < 920 ? "self-stretch" : ""} ${screenWidth < 920 ? "flex-col" : ""} ${screenWidth < 920 ? "gap-4" : (screenWidth >= 920) ? "gap-3" : ""} animate-fadeIn animate-delay-600`}
          >
            <Button
              className={
                screenWidth < 920
                  ? "!self-stretch !flex !w-full"
                  : screenWidth >= 920
                    ? "!flex-[0_0_auto]"
                    : undefined
              }
              label="Try for Free"
              showIcon={false}
              size="big"
              stateProp="default"
              type="primary"
            />
            <Button
              className={
                screenWidth < 920
                  ? "!self-stretch !flex !w-full"
                  : screenWidth >= 920
                    ? "!flex-[0_0_auto]"
                    : undefined
              }
              label="Log in"
              showIcon={false}
              size="big"
              stateProp="default"
              type="secondary"
            />
          </div>
        </div>

        <div
          className={`w-full flex flex-col items-center max-w-[920px] gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative ${screenWidth < 920 ? "pt-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-xl)] px-0" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)]" : ""} animate-fadeIn animate-delay-500`}
        >
          <div className="w-full flex flex-col items-center max-w-[1080px] gap-6 flex-[0_0_auto] px-6 py-0 relative">
            <div className="w-full flex flex-col items-start max-w-[860px] gap-3 flex-[0_0_auto] relative">
              <div
                className={`font-body-XS self-stretch mt-[-1.00px] tracking-[var(--body-XS-letter-spacing)] text-[length:var(--body-XS-font-size)] [font-style:var(--body-XS-font-style)] font-[number:var(--body-XS-font-weight)] text-center leading-[var(--body-XS-line-height)] relative ${screenWidth < 920 ? "text-color-light-500" : (screenWidth >= 920) ? "text-color-light-250" : ""}`}
              >
                {screenWidth < 920 && <>Trusted by fast-growing startups</>}

                {screenWidth >= 920 && (
                  <p>Helping ambitious teams achieve more</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden relative">
            <div className="logo-slider flex items-center animate-logoSlide">
              {/* First set of logos */}
              <div className="logo-slide flex items-center gap-16 mx-8">
                <BrandsLogos
                  brand="bolt"
                  className="bg-[url(/assets/vector-8.svg)] !w-[55.89px] !relative" vector={""}                />
                <BrandsLogos
                  brand="open-AI"
                  className="bg-[url(/assets/vector-9.svg)] !w-[97.52px] !relative" vector={""}                />
                <BrandsLogos
                  brand="anthropic"
                  className="!h-[15.86px] bg-[url(/assets/vector-10.svg)] !w-[141.24px] !relative" vector={""}                />
                <BrandsLogos
                  brand="anima-logo"
                  className="!w-[81.6px] !relative"
                  vector="/assets/vector-11.svg"
                />
                <BrandsLogos
                  brand="replit"
                  className="!h-[23.81px] bg-[url(/assets/vector-12.svg)] !w-[100.72px] !relative" vector={""}                />
              </div>
              
              {/* Duplicate set of logos for seamless looping */}
              <div className="logo-slide flex items-center gap-16 mx-8">
                <BrandsLogos
                  brand="bolt"
                  className="bg-[url(/assets/vector-8.svg)] !w-[55.89px] !relative" vector={""}                />
                <BrandsLogos
                  brand="open-AI"
                  className="bg-[url(/assets/vector-9.svg)] !w-[97.52px] !relative" vector={""}                />
                <BrandsLogos
                  brand="anthropic"
                  className="!h-[15.86px] bg-[url(/assets/vector-10.svg)] !w-[141.24px] !relative" vector={""}                />
                <BrandsLogos
                  brand="anima-logo"
                  className="!w-[81.6px] !relative"
                  vector="/assets/vector-11.svg"
                />
                <BrandsLogos
                  brand="replit"
                  className="!h-[23.81px] bg-[url(/assets/vector-12.svg)] !w-[100.72px] !relative" vector={""}                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={featuresRef}
        className={`w-full flex flex-col items-center max-w-[920px] gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative ${screenWidth < 920 ? "pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-0" : (screenWidth >= 920) ? "pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-3xl)] pl-[var(--spacing-spacing-xl)]" : ""} pt-0 ${featuresInView ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div className="w-full flex self-stretch flex-col items-start gap-[var(--spacing-spacing-lg)] flex-[0_0_auto] relative">
          {screenWidth < 920 && (
            <>
              <div className="flex flex-col min-w-[280px] items-start gap-[var(--spacing-spacing-xl)] pt-[var(--spacing-spacing-xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] relative self-stretch w-full flex-[0_0_auto] bg-color-light-50 rounded-[var(--spacing-corner-radius-xl)] overflow-hidden border border-solid border-color-light-250">
                <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-2.5 p-4 relative flex-[0_0_auto] bg-color-primary-100 rounded-2xl border-[none] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-2xl before:[background:linear-gradient(180deg,rgba(255,135,71,1)_0%,rgba(23,23,23,0.1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none">
                    <div className="relative w-6 h-6">
                      <img
                        className="absolute w-[22px] h-[22px] top-px left-px animate-icon-bounce"
                        alt="Icon"
                        src="/assets/icon.svg"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative self-stretch mt-[-1.00px] font-headline-h7 font-[number:var(--headline-h7-font-weight)] text-color-light-1000 text-[length:var(--headline-h7-font-size)] tracking-[var(--headline-h7-letter-spacing)] leading-[var(--headline-h7-line-height)] [font-style:var(--headline-h7-font-style)]">
                      Seamless Task Automation
                    </div>

                    <p className="relative self-stretch font-body-SM font-[number:var(--body-SM-font-weight)] text-color-light-500 text-[length:var(--body-SM-font-size)] tracking-[var(--body-SM-letter-spacing)] leading-[var(--body-SM-line-height)] [font-style:var(--body-SM-font-style)]">
                      Let your AI agent handle the busywork so your team can
                      focus on what really matters, innovation and growth.
                    </p>
                  </div>
                </div>

                <img
                  className="relative self-stretch w-full h-[279px] object-cover"
                  alt="Image placeholder"
                  src="/assets/image-placeholder-1.svg"
                />
              </div>

              <FeaturesCard
                className="!self-stretch !flex-[0_0_auto] !min-w-[280px] !w-full"
                imagePlaceholder="/assets/image-placeholder-2.svg"
                imagePlaceholderClassName="!h-[279px]"
                property1="vertical"
                showIcon={false}
                text="Real-Time Insights"
                text1="Gain actionable data at your fingertips, with AI-generated reports that help you make confident decisions, faster."
              />
              <FeaturesCard
                className="!self-stretch !flex-[0_0_auto] !min-w-[280px] !w-full"
                imagePlaceholder="/assets/image-placeholder-3.svg"
                imagePlaceholderClassName="!h-[279px]"
                property1="vertical"
                showIcon={false}
                text="Flexible Integrations"
                text1="Connect your favorite tools and workflows with ease. Your AI agent fits right into your ecosystem, better results, faster."
              />
            </>
          )}

          {screenWidth >= 920 && (
            <>
              <div className="justify-between self-stretch w-full flex-[0_0_auto] flex min-w-[280px] items-start pt-[var(--spacing-spacing-xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] relative bg-color-light-50 rounded-[var(--sizing-sizing-xxl)] overflow-hidden border border-solid border-color-light-250">
                <div className="max-w-[420px] justify-between flex-1 grow flex flex-col items-start relative self-stretch">
                  <div className="inline-flex items-center gap-2.5 p-4 relative flex-[0_0_auto] bg-color-primary-100 rounded-2xl border-[none] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-2xl before:[background:linear-gradient(180deg,rgba(255,135,71,1)_0%,rgba(23,23,23,0.1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none">
                    <div className="relative w-6 h-6">
                      <img
                        className="w-[22px] h-[22px] left-px absolute top-px animate-icon-bounce"
                        alt="Icon"
                        src="/assets/icon-3.svg"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative self-stretch mt-[-1.00px] font-headline-h7 font-[number:var(--headline-h7-font-weight)] text-color-light-1000 text-[length:var(--headline-h7-font-size)] tracking-[var(--headline-h7-letter-spacing)] leading-[var(--headline-h7-line-height)] [font-style:var(--headline-h7-font-style)]">
                      Seamless Task Automation
                    </div>

                    <p className="relative self-stretch font-body-SM font-[number:var(--body-SM-font-weight)] text-color-light-500 text-[length:var(--body-SM-font-size)] tracking-[var(--body-SM-letter-spacing)] leading-[var(--body-SM-line-height)] [font-style:var(--body-SM-font-style)]">
                      Let your AI agent handle the busywork so your team can
                      focus on what really matters, innovation and growth.
                    </p>
                  </div>
                </div>

                <img
                  className="w-[260px] h-[260px] relative object-cover"
                  alt="Image placeholder"
                  src="/assets/image-placeholder-4.png"
                />
              </div>

              <div className="items-start justify-center gap-[12px_12px] flex flex-wrap relative self-stretch w-full flex-[0_0_auto]">
                <FeaturesCard
                  className="!flex-1 !grow !min-w-[280px] !w-[unset]"
                  imagePlaceholder="/assets/image-placeholder-5.png"
                  imagePlaceholderClassName="!h-[382px]"
                  property1="vertical"
                  showIcon={false}
                  text="Real-Time Insights"
                  text1="Gain actionable data at your fingertips, with AI-generated reports that help you make confident decisions, faster."
                />
                <FeaturesCard
                  className="!flex-1 !grow !min-w-[280px] !w-[unset]"
                  imagePlaceholder="/assets/image-placeholder-6.png"
                  imagePlaceholderClassName="!h-[382px]"
                  property1="vertical"
                  showIcon={false}
                  text="Flexible Integrations"
                  text1="Connect your favorite tools and workflows with ease. Your AI agent fits right into your ecosystem, better results, faster."
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div
        ref={benefitsRef}
        className={`w-full flex flex-col items-center max-w-[920px] gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative ${screenWidth < 920 ? "pt-[var(--spacing-spacing-4xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-4xl)] pl-[var(--spacing-spacing-xl)]" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-3xl)] pl-[var(--spacing-spacing-xl)]" : ""} ${benefitsInView ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div
          className={`w-full flex flex-col items-center max-w-[1080px] flex-[0_0_auto] px-6 py-0 relative ${screenWidth < 920 ? "gap-6" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-xl)]" : ""}`}
        >
              <div className="inline-flex items-center flex-[0_0_auto] p-4 relative rounded-2xl gap-2.5 bg-color-primary-100 border-[none] before:content-[''] before:[mask-composite:exclude] before:pointer-events-none before:inset-0 before:[background:linear-gradient(180deg,rgba(255,135,71,1)_0%,rgba(23,23,23,0.1)_100%)] before:absolute before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:rounded-2xl before:p-px before:z-[1] before:[-webkit-mask-composite:xor] animate-fadeIn animate-delay-300">
                <div className="w-6 h-6 relative">
                  <img
                    className="w-5 left-0.5 top-px h-[22px] absolute animate-icon-bounce"
                    alt="Icon"
                    src={
                      screenWidth < 920
                        ? "/assets/icon-1.svg"
                        : screenWidth >= 920
                          ? "/assets/icon-4.svg"
                          : undefined
                    }
                  />
                </div>
              </div>

          <div
            className={`relative ${screenWidth < 920 ? "flex" : ""} ${screenWidth >= 920 ? "[font-style:var(--body-LG-font-style)]" : ""} ${screenWidth < 920 ? "items-start" : ""} ${screenWidth < 920 ? "max-w-[860px]" : ""} ${screenWidth < 920 ? "flex-[0_0_auto]" : ""} ${screenWidth >= 920 ? "text-color-light-750" : ""} ${screenWidth >= 920 ? "leading-[var(--body-LG-line-height)]" : ""} ${screenWidth >= 920 ? "font-body-LG" : ""} ${screenWidth < 920 ? "w-full" : ""} ${screenWidth < 920 ? "flex-col" : ""} ${screenWidth >= 920 ? "font-[number:var(--body-LG-font-weight)]" : ""} ${screenWidth >= 920 ? "text-center" : ""} ${screenWidth >= 920 ? "text-[length:var(--body-LG-font-size)]" : ""} ${screenWidth < 920 ? "gap-3" : ""} ${screenWidth >= 920 ? "self-stretch" : ""} ${screenWidth >= 920 ? "tracking-[var(--body-LG-letter-spacing)]" : ""}`}
          >
            {screenWidth < 920 && (
              <p className="relative self-stretch mt-[-1.00px] font-body-LG font-[number:var(--body-LG-font-weight)] text-color-light-500 text-[length:var(--body-LG-font-size)] text-center tracking-[var(--body-LG-letter-spacing)] leading-[var(--body-LG-line-height)] [font-style:var(--body-LG-font-style)]">
                5,000+ teams who get more done together
              </p>
            )}

            {screenWidth >= 920 && (
              <p>Join thousands of teams accelerating their growth</p>
            )}
          </div>
        </div>

        <div className="w-full flex self-stretch flex-col items-start gap-[var(--spacing-spacing-md)] flex-[0_0_auto] relative">
          <div
            className={`w-full flex flex-wrap self-stretch items-start flex-[0_0_auto] justify-center relative ${screenWidth >= 920 ? "gap-[var(--spacing-spacing-md)]" : (screenWidth < 920) ? "gap-[12px_12px]" : ""}`}
          >
            <BenefitCard
              className="!flex-1 !grow !min-w-[280px] !w-[unset]"
              text={screenWidth >= 920 ? "12x" : undefined}
              text1={screenWidth >= 920 ? "Faster results" : undefined}
            />
            <BenefitCard
              className="!flex-1 !grow !min-w-[280px] !w-[unset]"
              text="8x"
              text1="More efficiency"
            />
          </div>

          <div
            className={`w-full flex flex-wrap self-stretch items-start flex-[0_0_auto] justify-center relative ${screenWidth < 920 ? "gap-[12px_12px]" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-md)]" : ""}`}
          >
            <BenefitCard
              className="!flex-1 !grow !min-w-[280px] !w-[unset]"
              text="95%"
              text1="Tasks automated"
            />
            <BenefitCard
              className="!flex-1 !grow !min-w-[280px] !w-[unset]"
              text="80%"
              text1="Less manual work"
            />
          </div>

          {screenWidth < 920 && (
            <>
              <BenefitCard
                className="!self-stretch !flex-[0_0_auto] !min-w-[280px] !w-full"
                text="7x"
                text1="Higher ROI"
              />
              <BenefitCard
                className="!self-stretch !flex-[0_0_auto] !min-w-[280px] !w-full"
                text="6x"
                text1="Quicker Launches"
              />
            </>
          )}

          {screenWidth >= 920 && (
            <div className="items-start justify-center gap-[var(--spacing-spacing-md)] flex flex-wrap relative self-stretch w-full flex-[0_0_auto]">
              <BenefitCard
                className="!flex-1 !grow !min-w-[280px] !w-[unset]"
                text="7x"
                text1="Higher ROI"
              />
              <BenefitCard
                className="!flex-1 !grow !min-w-[280px] !w-[unset]"
                text="6x"
                text1="Quicker Launches"
              />
            </div>
          )}
        </div>
      </div>

      <div
        ref={testimonialsRef}
        className={`w-full flex flex-col items-center max-w-[1080px] gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative ${screenWidth < 920 ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-4xl)] pl-[var(--spacing-spacing-3xl)]" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-3xl)] pb-[var(--spacing-spacing-3xl)] pl-[var(--spacing-spacing-3xl)]" : ""} ${testimonialsInView ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div
          className={`w-full flex flex-col items-center max-w-[1080px] flex-[0_0_auto] relative ${screenWidth < 920 ? "gap-6" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-xl)]" : ""} ${screenWidth < 920 ? "px-6 py-0" : (screenWidth >= 920) ? "pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-0" : ""}`}
        >
          <Badge
            label={
              screenWidth < 920
                ? "FAQ"
                : screenWidth >= 920
                  ? "Feedback"
                  : undefined
            }
            showIcon={false}
            state="default"
          />
          <div
            className={`w-full flex flex-col items-start max-w-[860px] flex-[0_0_auto] relative ${screenWidth < 920 ? "gap-3" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-md)]" : ""}`}
          >
            <div className="w-full flex self-stretch flex-col items-start gap-3 flex-[0_0_auto] relative">
              <p
                className={`self-stretch mt-[-1.00px] text-color-light-1000 text-center relative ${screenWidth < 920 ? "font-headline-h6" : (screenWidth >= 920) ? "font-headline-h4" : ""} ${screenWidth < 920 ? "tracking-[var(--headline-h6-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--headline-h4-letter-spacing)]" : ""} ${screenWidth < 920 ? "text-[length:var(--headline-h6-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--headline-h4-font-size)]" : ""} ${screenWidth < 920 ? "[font-style:var(--headline-h6-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--headline-h4-font-style)]" : ""} ${screenWidth < 920 ? "font-[number:var(--headline-h6-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--headline-h4-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--headline-h6-line-height)]" : (screenWidth >= 920) ? "leading-[var(--headline-h4-line-height)]" : ""}`}
              >
                Get more done with us
              </p>
            </div>

            <p
              className={`self-stretch text-center relative ${screenWidth < 920 ? "font-body-MD" : (screenWidth >= 920) ? "font-body-LG" : ""} ${screenWidth < 920 ? "tracking-[var(--body-MD-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--body-LG-letter-spacing)]" : ""} ${screenWidth < 920 ? "[font-style:var(--body-MD-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--body-LG-font-style)]" : ""} ${screenWidth < 920 ? "text-[length:var(--body-MD-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--body-LG-font-size)]" : ""} ${screenWidth < 920 ? "text-color-light-500" : (screenWidth >= 920) ? "text-color-light-750" : ""} ${screenWidth < 920 ? "font-[number:var(--body-MD-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--body-LG-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--body-MD-line-height)]" : (screenWidth >= 920) ? "leading-[var(--body-LG-line-height)]" : ""}`}
            >
              See why forward-thinking companies rely on our AI agent to stay
              ahead.
            </p>
          </div>
        </div>

        <div className="w-full overflow-hidden relative">
          <div className="quotes-slider flex items-start animate-quotesSlide">
            {/* First set of quotes */}
            <div className="quotes-slide flex items-start gap-[var(--spacing-spacing-lg)] mx-8">
              <Quote
                className="!flex-1 !grow !min-w-[360px] !w-[360px]"
                text="This AI is like adding a genius co-worker to the team. We’ve doubled our output without doubling our hours."
                text1="Jordan S."
                text2="Head of product"
                text3="@InnovateX"
              />
              <Quote
                className="!flex-1 !grow !min-w-[360px] !w-[360px]"
                text="Our workflows are finally smooth and automated. The AI assistant is like having an extra pair of hands that never sleeps."
                text1="Elena T."
                text2=" Growth Strategist"
                text3="@Skyline"
              />
              <Quote
                className="!flex-1 !grow !min-w-[360px] !w-[360px]"
                text="We cut our project timelines in half. I don’t know how we worked without this before."
                text1="Priya K."
                text2="Operations Lead"
                text3="@Flowkey"
              />
              <Quote
                className="!flex-1 !grow !min-w-[360px] !w-[360px]"
                text="The insights we get are next-level, we make decisions twice as fast, with more confidence."
                text1="Amira L."
                text2="Founder"
                text3="@Sparkly"
              />
            </div>
            
            {/* Duplicate set of quotes for seamless looping */}
            <div className="quotes-slide flex items-start gap-[var(--spacing-spacing-lg)] mx-8">
              <Quote
                className="!flex-1 !grow !min-w-[360px] !w-[360px]"
                text="This AI is like adding a genius co-worker to the team. We’ve doubled our output without doubling our hours."
                text1="Jordan S."
                text2="Head of product"
                text3="@InnovateX"
              />
              <Quote
                className="!flex-1 !grow !min-w-[360px] !w-[360px]"
                text="Our workflows are finally smooth and automated. The AI assistant is like having an extra pair of hands that never sleeps."
                text1="Elena T."
                text2=" Growth Strategist"
                text3="@Skyline"
              />
              <Quote
                className="!flex-1 !grow !min-w-[360px] !w-[360px]"
                text="We cut our project timelines in half. I don’t know how we worked without this before."
                text1="Priya K."
                text2="Operations Lead"
                text3="@Flowkey"
              />
              <Quote
                className="!flex-1 !grow !min-w-[360px] !w-[360px]"
                text="The insights we get are next-level, we make decisions twice as fast, with more confidence."
                text1="Amira L."
                text2="Founder"
                text3="@Sparkly"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={pricingRef}
        className={`w-full flex flex-col items-center max-w-[1080px] gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative ${screenWidth < 920 ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-4xl)] pl-[var(--spacing-spacing-xl)]" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-3xl)] pl-[var(--spacing-spacing-xl)]" : ""} ${pricingInView ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div className="w-full flex self-stretch flex-col items-center gap-[var(--spacing-spacing-xl)] flex-[0_0_auto] relative">
          <Badge
            label={
              screenWidth < 920
                ? "Boost your productivity"
                : screenWidth >= 920
                  ? "Pricing"
                  : undefined
            }
            showIcon={false}
            state="default"
          />
          <div
            className={`text-color-light-1000 relative text-center ${screenWidth < 920 ? "font-headline-h6" : (screenWidth >= 920) ? "font-headline-h4" : ""} ${screenWidth < 920 ? "tracking-[var(--headline-h6-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--headline-h4-letter-spacing)]" : ""} ${screenWidth < 920 ? "[font-style:var(--headline-h6-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--headline-h4-font-style)]" : ""} ${screenWidth < 920 ? "text-[length:var(--headline-h6-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--headline-h4-font-size)]" : ""} ${screenWidth < 920 ? "font-[number:var(--headline-h6-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--headline-h4-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--headline-h6-line-height)]" : (screenWidth >= 920) ? "leading-[var(--headline-h4-line-height)]" : ""}`}
          >
            Simple &amp; Transparent Pricing
          </div>

          <div className="w-full flex self-stretch items-center gap-3 flex-[0_0_auto] justify-center relative">
            <div
              className={`w-fit mt-[-1.00px] text-color-light-1000 text-center relative ${screenWidth < 920 ? "font-body-MD" : (screenWidth >= 920) ? "[font-family:'Open_Sans',Helvetica]" : ""} ${screenWidth < 920 ? "tracking-[var(--body-MD-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[0]" : ""} ${screenWidth < 920 ? "text-[length:var(--body-MD-font-size)]" : (screenWidth >= 920) ? "text-lg" : ""} ${screenWidth < 920 ? "[font-style:var(--body-MD-font-style)]" : ""} ${screenWidth < 920 ? "font-[number:var(--body-MD-font-weight)]" : (screenWidth >= 920) ? "font-semibold" : ""} ${screenWidth < 920 ? "whitespace-nowrap" : ""} ${screenWidth < 920 ? "leading-[var(--body-MD-line-height)]" : (screenWidth >= 920) ? "leading-[normal]" : ""}`}
            >
              Monthly
            </div>

            <Toggle 
              className="!w-[42.35px]" 
              stateProp={isYearly ? "on" : "off"} 
              onClick={handleToggleClick}
            />
            <div
              className={`w-fit mt-[-1.00px] text-color-light-1000 text-center relative ${screenWidth < 920 ? "font-body-MD" : (screenWidth >= 920) ? "[font-family:'Open_Sans',Helvetica]" : ""} ${screenWidth < 920 ? "tracking-[var(--body-MD-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[0]" : ""} ${screenWidth < 920 ? "text-[length:var(--body-MD-font-size)]" : (screenWidth >= 920) ? "text-lg" : ""} ${screenWidth < 920 ? "[font-style:var(--body-MD-font-style)]" : ""} ${screenWidth < 920 ? "font-[number:var(--body-MD-font-weight)]" : (screenWidth >= 920) ? "font-semibold" : ""} ${screenWidth < 920 ? "whitespace-nowrap" : ""} ${screenWidth < 920 ? "leading-[var(--body-MD-line-height)]" : (screenWidth >= 920) ? "leading-[normal]" : ""}`}
            >
              Yearly
            </div>
          </div>
        </div>

        <div className="w-full flex flex-wrap self-stretch items-start gap-[var(--spacing-spacing-md)] flex-[0_0_auto] relative">
          <PricingCard
            checkCheck={
              screenWidth < 920
                ? "/assets/checkmark-24.svg"
                : screenWidth >= 920
                  ? "/assets/checkmark-29.svg"
                  : undefined
            }
            checkCheck1={
              screenWidth < 920
                ? "/assets/checkmark-24.svg"
                : screenWidth >= 920
                  ? "/assets/checkmark-29.svg"
                  : undefined
            }
            checkCheck2={
              screenWidth < 920
                ? "/assets/checkmark-24.svg"
                : screenWidth >= 920
                  ? "/assets/checkmark-29.svg"
                  : undefined
            }
            checkCheck3={
              screenWidth < 920
                ? "/assets/checkmark-24.svg"
                : screenWidth >= 920
                  ? "/assets/checkmark-29.svg"
                  : undefined
            }
            checkImg={
              screenWidth < 920
                ? "/assets/checkmark-24.svg"
                : screenWidth >= 920
                  ? "/assets/checkmark-29.svg"
                  : undefined
            }
            className={
              screenWidth < 920
                ? "!flex-1 !grow !min-w-[280px] !w-[unset]"
                : screenWidth >= 920
                  ? "!min-w-[280px] !flex-1 !grow !w-[unset]"
                  : undefined
            }
            featuresDescriptionClassName={
              screenWidth >= 920 ? "!mr-[-1.33px]" : undefined
            }
            text="1 user"
            text1="Basic features"
            text2="Email support"
            text3="Secure cloud storage"
            text4="Access to community forum"
            text5="Perfect for individuals getting started."
            text6={screenWidth >= 920 ? "Basic" : undefined}
            text7={screenWidth >= 920 ? `$${basicPrice}` : undefined}
            type="default"
          />
          <div className="flex items-start flex-1 pt-[var(--spacing-spacing-xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] relative flex-col grow rounded-[var(--spacing-corner-radius-sm)] gap-[var(--spacing-spacing-xl)] bg-color-primary-100 border-[none] min-w-[280px] before:content-[''] before:[mask-composite:exclude] before:pointer-events-none before:inset-0 before:[background:linear-gradient(180deg,rgba(255,135,71,1)_0%,rgba(23,23,23,0.1)_100%)] before:absolute before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:rounded-lg before:p-px before:z-[1] before:[-webkit-mask-composite:xor] animate-border-glow">
            <div className="w-full flex self-stretch flex-col items-start gap-4 flex-[0_0_auto] relative">
              <div className="w-full flex self-stretch items-start flex-[0_0_auto] justify-between relative">
                <div className="font-body-MD w-fit mt-[-1.00px] tracking-[var(--body-MD-letter-spacing)] text-[length:var(--body-MD-font-size)] [font-style:var(--body-MD-font-style)] text-color-light-1000 font-[number:var(--body-MD-font-weight)] text-center whitespace-nowrap leading-[var(--body-MD-line-height)] relative">
                  Pro
                </div>

                <div className="border border-solid border-color-primary-100 inline-flex items-center gap-1 flex-[0_0_auto] px-3 py-1.5 h-8 rounded-3xl justify-center bg-color-primary-100 relative">
                  <div className="w-[18px] h-[18px] relative animate-pulse">
                    <img
                      className={`w-[15px] left-0.5 top-px absolute ${screenWidth < 920 ? "h-4" : (screenWidth >= 920) ? "h-[17px]" : ""}`}
                      alt="Icon"
                      src={
                        screenWidth < 920
                          ? "/assets/icon-2.svg"
                          : screenWidth >= 920
                            ? "/assets/icon-5.svg"
                            : undefined
                      }
                    />
                  </div>

                  <div className="inline-flex items-center gap-1.5 flex-[0_0_auto] relative">
                    <div className="font-body-XS w-fit mt-[-1.00px] tracking-[var(--body-XS-letter-spacing)] text-[length:var(--body-XS-font-size)] [font-style:var(--body-XS-font-style)] text-color-light-1000 font-[number:var(--body-XS-font-weight)] leading-[var(--body-XS-line-height)] whitespace-nowrap relative">
                      Most Popular
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-3 flex-[0_0_auto] relative">
                <div className="font-headline-h5 w-fit mt-[-1.00px] tracking-[var(--headline-h5-letter-spacing)] text-[length:var(--headline-h5-font-size)] [font-style:var(--headline-h5-font-style)] text-color-light-1000 relative font-[number:var(--headline-h5-font-weight)] text-center whitespace-nowrap leading-[var(--headline-h5-line-height)]">
                  ${proPrice}
                </div>

                <div className="font-body-MD w-fit tracking-[var(--body-MD-letter-spacing)] [font-style:var(--body-MD-font-style)] text-[length:var(--body-MD-font-size)] text-color-light-1000 font-[number:var(--body-MD-font-weight)] text-center whitespace-nowrap leading-[var(--body-MD-line-height)] relative">
                  /month
                </div>
              </div>

              <Button
                className="!self-stretch !flex !w-full"
                label="Subscribe"
                showIcon={false}
                size="big"
                stateProp="default"
                type="primary"
              />
            </div>

            <div className="w-full flex self-stretch flex-col items-start gap-3 flex-[0_0_auto] relative">
              <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
                <Check
                  check={
                    screenWidth < 920
                      ? "/assets/checkmark-24.svg"
                      : screenWidth >= 920
                        ? "/assets/checkmark-34.svg"
                        : undefined
                  }
                  className="!relative !left-[unset] !top-[unset]"
                />
                <p className="font-body-SM w-fit mt-[-1.00px] tracking-[var(--body-SM-letter-spacing)] text-[length:var(--body-SM-font-size)] [font-style:var(--body-SM-font-style)] text-color-light-1000 font-[number:var(--body-SM-font-weight)] leading-[var(--body-SM-line-height)] whitespace-nowrap relative">
                  Up to 5 project members
                </p>
              </div>

              <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
                <Check
                  check={
                    screenWidth < 920
                      ? "/assets/checkmark-24.svg"
                      : screenWidth >= 920
                        ? "/assets/checkmark-34.svg"
                        : undefined
                  }
                  className="!relative !left-[unset] !top-[unset]"
                />
                <div
                  className={`font-body-SM w-fit mt-[-1.00px] tracking-[var(--body-SM-letter-spacing)] text-[length:var(--body-SM-font-size)] [font-style:var(--body-SM-font-style)] text-color-light-1000 font-[number:var(--body-SM-font-weight)] leading-[var(--body-SM-line-height)] whitespace-nowrap relative ${screenWidth >= 920 ? "mr-[-6.33px]" : ""}`}
                >
                  Unlimited tasks and projects
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
                <Check
                  check={
                    screenWidth < 920
                      ? "/assets/checkmark-24.svg"
                      : screenWidth >= 920
                        ? "/assets/checkmark-34.svg"
                        : undefined
                  }
                  className="!relative !left-[unset] !top-[unset]"
                />
                <div className="font-body-SM w-fit mt-[-1.00px] tracking-[var(--body-SM-letter-spacing)] text-[length:var(--body-SM-font-size)] [font-style:var(--body-SM-font-style)] text-color-light-1000 font-[number:var(--body-SM-font-weight)] leading-[var(--body-SM-line-height)] whitespace-nowrap relative">
                  2GB storage
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
                <Check
                  check={
                    screenWidth < 920
                      ? "/assets/checkmark-24.svg"
                      : screenWidth >= 920
                        ? "/assets/checkmark-34.svg"
                        : undefined
                  }
                  className="!relative !left-[unset] !top-[unset]"
                />
                <div className="font-body-SM w-fit mt-[-1.00px] tracking-[var(--body-SM-letter-spacing)] text-[length:var(--body-SM-font-size)] [font-style:var(--body-SM-font-style)] text-color-light-1000 font-[number:var(--body-SM-font-weight)] leading-[var(--body-SM-line-height)] whitespace-nowrap relative">
                  Integrations
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
                <Check
                  check={
                    screenWidth < 920
                      ? "/assets/checkmark-24.svg"
                      : screenWidth >= 920
                        ? "/assets/checkmark-34.svg"
                        : undefined
                  }
                  className="!relative !left-[unset] !top-[unset]"
                />
                <div className="font-body-SM w-fit mt-[-1.00px] tracking-[var(--body-SM-letter-spacing)] text-[length:var(--body-SM-font-size)] [font-style:var(--body-SM-font-style)] text-color-light-1000 font-[number:var(--body-SM-font-weight)] leading-[var(--body-SM-line-height)] whitespace-nowrap relative">
                  Basic support
                </div>
              </div>
            </div>

            <p
              className={`font-body-XS self-stretch tracking-[var(--body-XS-letter-spacing)] [font-style:var(--body-XS-font-style)] text-[length:var(--body-XS-font-size)] font-[number:var(--body-XS-font-weight)] text-center leading-[var(--body-XS-line-height)] relative ${screenWidth < 920 ? "text-color-light-500" : (screenWidth >= 920) ? "text-color-light-500" : ""}`}
            >
              Ideal for growing businesses and teams
            </p>
          </div>

          <PricingCard
            checkCheck={
              screenWidth < 920
                ? "/assets/checkmark-24.svg"
                : screenWidth >= 920
                  ? "/assets/checkmark-39.svg"
                  : undefined
            }
            checkCheck1={
              screenWidth < 920
                ? "/assets/checkmark-24.svg"
                : screenWidth >= 920
                  ? "/assets/checkmark-39.svg"
                  : undefined
            }
            checkCheck2={
              screenWidth < 920
                ? "/assets/checkmark-24.svg"
                : screenWidth >= 920
                  ? "/assets/checkmark-39.svg"
                  : undefined
            }
            checkCheck3={
              screenWidth < 920
                ? "/assets/checkmark-24.svg"
                : screenWidth >= 920
                  ? "/assets/checkmark-39.svg"
                  : undefined
            }
            checkImg={
              screenWidth < 920
                ? "/assets/checkmark-24.svg"
                : screenWidth >= 920
                  ? "/assets/checkmark-39.svg"
                  : undefined
            }
            className={
              screenWidth < 920
                ? "!flex-1 !grow !min-w-[280px] !w-[unset]"
                : screenWidth >= 920
                  ? "!min-w-[280px] !flex-1 !grow !w-[unset]"
                  : undefined
            }
            featuresDescriptionClassName={
              screenWidth >= 920 ? "!mr-[-30.33px]" : undefined
            }
            featuresDescriptionClassNameOverride={
              screenWidth >= 920 ? "!mr-[-1.33px]" : undefined
            }
            text="Unlimited users"
            text1="Dedicated success manager"
            text2="Custom integrations"
            text3="SLA &amp; uptime guarantee"
            text4="Premium onboarding &amp; training"
            text5="Right choice for large organizations."
            text6="Enterprise"
            text7={`$${enterprisePrice}`}
            type="default"
          />
        </div>
      </div>

      <div
        ref={faqRef}
        className={`w-full flex self-stretch flex-col items-center gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative ${screenWidth < 920 ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-4xl)] pl-[var(--spacing-spacing-xl)]" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-3xl)] pb-[var(--spacing-spacing-3xl)] px-0" : ""} ${faqInView ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div
          className={`w-full flex flex-col items-center max-w-[1080px] gap-[var(--spacing-spacing-xl)] flex-[0_0_auto] relative ${screenWidth < 920 ? "px-6 py-0" : (screenWidth >= 920) ? "pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-0" : ""}`}
        >
          <Badge label="FAQ" showIcon={false} state="default" />
          <div
            className={`w-full flex flex-col items-start max-w-[860px] flex-[0_0_auto] relative ${screenWidth < 920 ? "gap-3" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-md)]" : ""}`}
          >
            <div className="w-full flex self-stretch flex-col items-start gap-3 flex-[0_0_auto] relative">
              <div
                className={`self-stretch mt-[-1.00px] text-color-light-1000 text-center relative ${screenWidth < 920 ? "font-headline-h6" : (screenWidth >= 920) ? "font-headline-h4" : ""} ${screenWidth < 920 ? "tracking-[var(--headline-h6-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--headline-h4-letter-spacing)]" : ""} ${screenWidth < 920 ? "text-[length:var(--headline-h6-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--headline-h4-font-size)]" : ""} ${screenWidth < 920 ? "[font-style:var(--headline-h6-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--headline-h4-font-style)]" : ""} ${screenWidth < 920 ? "font-[number:var(--headline-h6-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--headline-h4-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--headline-h6-line-height)]" : (screenWidth >= 920) ? "leading-[var(--headline-h4-line-height)]" : ""}`}
              >
                Frequently asked questions
              </div>
            </div>

            <p
              className={`self-stretch text-center relative ${screenWidth < 920 ? "font-body-MD" : (screenWidth >= 920) ? "font-body-LG" : ""} ${screenWidth < 920 ? "tracking-[var(--body-MD-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--body-LG-letter-spacing)]" : ""} ${screenWidth < 920 ? "[font-style:var(--body-MD-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--body-LG-font-style)]" : ""} ${screenWidth < 920 ? "text-[length:var(--body-MD-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--body-LG-font-size)]" : ""} ${screenWidth < 920 ? "text-color-light-500" : (screenWidth >= 920) ? "text-color-light-750" : ""} ${screenWidth < 920 ? "font-[number:var(--body-MD-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--body-LG-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--body-MD-line-height)]" : (screenWidth >= 920) ? "leading-[var(--body-LG-line-height)]" : ""}`}
            >
              Discover what our customers are saying.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center max-w-[860px] gap-[var(--spacing-spacing-sm)] flex-[0_0_auto] relative">
          <Faq
            className="!self-stretch !flex-[0_0_auto] !min-w-[280px] !w-full"
            stateProp="closed"
            text="How does the free trial work?"
          />
          <Faq
            className="!self-stretch !flex-[0_0_auto] !min-w-[280px] !w-full"
            stateProp="closed"
            text="Can I cancel anytime?"
          />
          <Faq
            className="!self-stretch !flex-[0_0_auto] !min-w-[280px] !w-full"
            stateProp="closed"
            text="Do you offer support?"
          />
          <Faq
            className="!self-stretch !flex-[0_0_auto] !min-w-[280px] !w-full"
            stateProp="closed"
            text="Is my data safe?"
          />
        </div>

        <div
          className={`font-body-SM self-stretch tracking-[var(--body-SM-letter-spacing)] [font-style:var(--body-SM-font-style)] text-[length:var(--body-SM-font-size)] font-[number:var(--body-SM-font-weight)] text-center leading-[var(--body-SM-line-height)] relative ${screenWidth < 920 ? "text-color-light-500" : (screenWidth >= 920) ? "text-[#ffffff80]" : ""}`}
        >
          {screenWidth < 920 && <p>Still have questions? Contact us.</p>}

          {screenWidth >= 920 && (
            <>
              <p>
                <span className="font-body-SM font-[number:var(--body-SM-font-weight)] text-[#ffffff80] text-[length:var(--body-SM-font-size)] tracking-[var(--body-SM-letter-spacing)] leading-[var(--body-SM-line-height)] [font-style:var(--body-SM-font-style)]">
                  Still have questions?{" "}
                </span>
              </p>

              <p>
                <span className="underline font-body-SM [font-style:var(--body-SM-font-style)] font-[number:var(--body-SM-font-weight)] tracking-[var(--body-SM-letter-spacing)] leading-[var(--body-SM-line-height)] text-[length:var(--body-SM-font-size)]">
                  Contact us.
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      <div
        ref={ctaRef}
        className={`bg-[linear-gradient(180deg,rgba(255,135,71,0)_0%,rgba(255,135,71,0.17)_100%)] w-full flex self-stretch flex-col items-center gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative ${screenWidth < 920 ? "pt-[var(--spacing-spacing-4xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-4xl)] pl-[var(--spacing-spacing-xl)]" : (screenWidth >= 920) ? "pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-[180px]" : ""} ${ctaInView ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div className="w-full flex flex-col items-center max-w-[1080px] gap-[var(--spacing-spacing-xxl)] flex-[0_0_auto] pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-0 relative">
          <div className="w-full flex flex-col items-start max-w-[860px] gap-[var(--spacing-spacing-md)] flex-[0_0_auto] relative">
            <p
              className={`self-stretch mt-[-1.00px] text-color-light-1000 relative text-center ${screenWidth < 920 ? "font-headline-h5" : (screenWidth >= 920) ? "font-headline-h4" : ""} ${screenWidth < 920 ? "tracking-[var(--headline-h5-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--headline-h4-letter-spacing)]" : ""} ${screenWidth < 920 ? "text-[length:var(--headline-h5-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--headline-h4-font-size)]" : ""} ${screenWidth < 920 ? "[font-style:var(--headline-h5-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--headline-h4-font-style)]" : ""} ${screenWidth < 920 ? "font-[number:var(--headline-h5-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--headline-h4-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--headline-h5-line-height)]" : (screenWidth >= 920) ? "leading-[var(--headline-h4-line-height)]" : ""}`}
            >
              Ready to See It in Action?
            </p>

            <p
              className={`self-stretch text-center relative ${screenWidth < 920 ? "font-body-MD" : (screenWidth >= 920) ? "font-body-LG" : ""} ${screenWidth < 920 ? "tracking-[var(--body-MD-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--body-LG-letter-spacing)]" : ""} ${screenWidth < 920 ? "[font-style:var(--body-MD-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--body-LG-font-style)]" : ""} ${screenWidth < 920 ? "text-[length:var(--body-MD-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--body-LG-font-size)]" : ""} ${screenWidth < 920 ? "text-color-light-500" : (screenWidth >= 920) ? "text-color-light-750" : ""} ${screenWidth < 920 ? "font-[number:var(--body-MD-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--body-LG-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--body-MD-line-height)]" : (screenWidth >= 920) ? "leading-[var(--body-LG-line-height)]" : ""}`}
            >
              Start your free 7-day trial today, experience what your AI agent
              can do for you.
            </p>
          </div>

          <div className="w-full flex self-stretch flex-col items-center gap-6 flex-[0_0_auto] relative">
            <Button
              label="Get Started"
              showIcon={false}
              size="big"
              stateProp="default"
              type="secondary" className={undefined}            />
          </div>
        </div>

        <img
          className={`object-cover absolute animate-float ${screenWidth < 920 ? "w-[191px]" : (screenWidth >= 920) ? "w-[479px]" : ""} ${screenWidth < 920 ? "left-0" : (screenWidth >= 920) ? "right-[-100px]" : ""} ${screenWidth < 920 ? "top-[242px]" : (screenWidth >= 920) ? "top-[-175px]" : ""} ${screenWidth < 920 ? "h-52" : (screenWidth >= 920) ? "h-[479px]" : ""}`}
          alt="Image placeholder"
          src={
            screenWidth < 920
              ? "/assets/image-placeholder-left.png"
              : screenWidth >= 920
                ? "/assets/image-placeholder-right-1.png"
                : undefined
          }
        />

        <img
          className={`object-cover absolute animate-float-reverse ${screenWidth < 920 ? "w-[177px]" : (screenWidth >= 920) ? "w-[478px]" : ""} ${screenWidth < 920 ? "left-[198px]" : (screenWidth >= 920) ? "left-[-83px]" : ""} ${screenWidth < 920 ? "top-0" : (screenWidth >= 920) ? "top-[180px]" : ""} ${screenWidth < 920 ? "h-[191px]" : (screenWidth >= 920) ? "h-[478px]" : ""}`}
          alt="Image placeholder"
          src={
            screenWidth < 920
              ? "/assets/image-placeholder-right.png"
              : screenWidth >= 920
                ? "/assets/image-placeholder-left-1.png"
                : undefined
          }
        />
      </div>

      <footer
        className={`w-full flex self-stretch items-start flex-[0_0_auto] relative ${screenWidth >= 920 ? "flex-wrap" : ""} ${screenWidth < 920 ? "gap-[512px]" : (screenWidth >= 920) ? "gap-[32px_462px]" : ""} ${screenWidth < 920 ? "px-6 py-10" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-3xl)] pb-[var(--spacing-spacing-3xl)] pl-[var(--spacing-spacing-3xl)]" : ""} ${screenWidth < 920 ? "justify-around" : (screenWidth >= 920) ? "justify-center" : ""} ${screenWidth < 920 ? "bg-color-dark-1000" : (screenWidth >= 920) ? "bg-transparent" : ""}`}
      >
        <div
          className={`flex items-start max-w-[1080px] relative ${screenWidth >= 920 ? "w-[840px]" : ""} ${screenWidth < 920 ? "flex-col" : ""} ${screenWidth < 920 ? "grow" : ""} ${screenWidth < 920 ? "gap-[var(--spacing-spacing-xxl)]" : ""} ${screenWidth < 920 ? "flex-1" : ""} ${screenWidth >= 920 ? "ml-[-2.00px]" : ""} ${screenWidth >= 920 ? "mr-[-2.00px]" : ""} ${screenWidth >= 920 ? "justify-between" : ""}`}
        >
          <div
            className={`inline-flex flex-col items-start flex-[0_0_auto] relative ${screenWidth >= 920 ? "min-w-60" : ""} ${screenWidth < 920 ? "gap-[42px]" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-3xl)]" : ""}`}
          >
            <div
              className={`inline-flex flex-col items-start flex-[0_0_auto] relative ${screenWidth < 920 ? "gap-5" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-xl)]" : ""}`}
            >
              <div className="inline-flex items-center gap-2.5 flex-[0_0_auto] p-2 rounded-lg bg-color-light-50 relative">
                <img
                  className="w-6 h-6 relative"
                  alt="Triangle"
                  src={
                    screenWidth < 920
                      ? "/assets/triangle.svg"
                      : screenWidth >= 920
                        ? "/assets/triangle-1.svg"
                        : undefined
                  }
                />
              </div>

              <div className="font-headline-h7 w-fit tracking-[var(--headline-h7-letter-spacing)] [font-style:var(--headline-h7-font-style)] text-[length:var(--headline-h7-font-size)] text-color-light-1000 font-[number:var(--headline-h7-font-weight)] leading-[var(--headline-h7-line-height)] whitespace-nowrap relative">
                Afterglow
              </div>

              <div className="font-body-XS w-60 tracking-[var(--body-XS-letter-spacing)] [font-style:var(--body-XS-font-style)] text-[length:var(--body-XS-font-size)] text-color-light-500 font-[number:var(--body-XS-font-weight)] leading-[var(--body-XS-line-height)] relative">
                {screenWidth < 920 && (
                  <p>
                    Effortlessly turn your ideas into a fully functional,
                    responsive, no-code SaaS website.
                  </p>
                )}

                {screenWidth >= 920 && (
                  <>Your AI-powered productivity partner.</>
                )}
              </div>
            </div>

            <div className="inline-flex items-start gap-4 flex-[0_0_auto] relative">
              <SocialMediaIcons
                brand="instagram"
                className="bg-[url(/assets/instagram-logo-1.svg)] !relative !bg-[100%_100%] !left-[unset] !w-[17.99px] !top-[unset]"
                color="monochrome"
                size="medium"
              />
              <SocialMediaIcons
                brand="linked-in"
                className={
                  screenWidth < 920
                    ? "bg-[url(/assets/linkedin-logo.svg)] !relative !bg-[100%_100%] !left-[unset] !top-[unset]"
                    : screenWidth >= 920
                      ? "bg-[url(/assets/linkedin-logo-1.svg)] !relative !bg-[100%_100%] !left-[unset] !top-[unset]"
                      : undefined
                }
                color="monochrome"
                size="medium"
              />
              <SocialMediaIcons
                brand="github"
                className={
                  screenWidth < 920
                    ? "!h-[17.7px] bg-[url(/assets/github-logo.svg)] !relative !bg-[100%_100%] !left-[unset] !top-[unset]"
                    : screenWidth >= 920
                      ? "!h-[17.7px] bg-[url(/assets/github-logo-1.svg)] !relative !bg-[100%_100%] !left-[unset] !top-[unset]"
                      : undefined
                }
                color="monochrome"
                size="medium"
              />
              <div className="w-[18px] h-[18px] relative">
                <img
                  className="w-4 left-px top-px h-[15px] absolute"
                  alt="Twitter x logo"
                  src={
                    screenWidth < 920
                      ? "/assets/twitter--x--logo.svg"
                      : screenWidth >= 920
                        ? "/assets/twitter--x--logo-1.svg"
                        : undefined
                  }
                />
              </div>
            </div>
          </div>

          <div
            className={`items-start gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative ${screenWidth < 920 ? "w-full" : ""} ${screenWidth < 920 ? "flex" : (screenWidth >= 920) ? "inline-flex" : ""} ${screenWidth < 920 ? "self-stretch" : ""} ${screenWidth < 920 ? "flex-col" : ""}`}
          >
            {screenWidth < 920 && (
              <div className="justify-center gap-[var(--spacing-spacing-3xl)] flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <div className="gap-5 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-1000 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Product
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Features
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Integrations
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Updates
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    FAQ
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Pricing
                  </div>
                </div>

                <div className="gap-5 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-1000 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Company
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    About
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Blog
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Careers
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Manifesto
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Contact
                  </div>
                </div>

                <div className="gap-5 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-1000 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Resources
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Examples
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Community
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Guides
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Docs
                  </div>
                </div>

                <div className="gap-5 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-1000 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Legal
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Privacy
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Terms
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Security
                  </div>
                </div>
              </div>
            )}

            {screenWidth >= 920 && (
              <>
                <div className="inline-flex flex-col items-start gap-[var(--spacing-spacing-lg)] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-1000 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Product
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Features
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Integrations
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Updates
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    FAQ
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Pricing
                  </div>
                </div>

                <div className="inline-flex flex-col items-start gap-[var(--spacing-spacing-lg)] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-1000 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Company
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    About
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Blog
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Careers
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Manifesto
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Contact
                  </div>
                </div>

                <div className="inline-flex flex-col items-start gap-[var(--spacing-spacing-lg)] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-1000 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Resources
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Examples
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Community
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Guides
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Docs
                  </div>
                </div>

                <div className="inline-flex flex-col items-start gap-[var(--spacing-spacing-lg)] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-1000 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Legal
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Privacy
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Terms
                  </div>

                  <div className="relative w-fit font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-250 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
                    Security
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
