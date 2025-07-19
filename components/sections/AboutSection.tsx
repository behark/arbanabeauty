"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedElement from "@/components/animations/AnimatedElement";
import StaggeredGroup from "@/components/animations/StaggeredGroup";

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-accent">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <AnimatedElement animation="fadeLeft" duration={0.7} className="relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto">
              <Image
                src="/images/arbana.jpg"
                alt="Arbana's Image"
                className="object-cover w-full h-full"
              />
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-4 border-primary z-[-1]"></div>
            </div>
          </AnimatedElement>

          {/* Content */}
          <AnimatedElement animation="fadeRight" duration={0.7} delay={0.2}>
            <AnimatedElement animation="fadeUp" delay={0.3}>
              <h2 className="heading-lg mb-6">{t('about.title')}</h2>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.4}>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {t('about.subtitle')}
              </p>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.5}>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {t('about.description')}
              </p>
            </AnimatedElement>
            
            <StaggeredGroup animation="fadeUp" staggerDelay={0.1} initialDelay={0.6} className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold text-xl mb-2">10+</h3>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">500+</h3>
                <p className="text-gray-600">Satisfied Clients</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">20+</h3>
                <p className="text-gray-600">Celebrity Collaborations</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">15+</h3>
                <p className="text-gray-600">Industry Awards</p>
              </div>
            </StaggeredGroup>
            <Link
              href="/about"
              className="px-6 py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary-dark transition-colors inline-block"
            >
              {t('about.cta')} Arbana
            </Link>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
