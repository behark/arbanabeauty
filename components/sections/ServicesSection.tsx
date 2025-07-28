"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/data/services";
import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services
            .filter((service) => service.isPopular)
            .map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={service.images[0]}
                    alt={language === "sq" ? service.nameAl : service.name}
                    fill
                    className="object-cover"
                  />
                  {service.isPopular && (
                    <div className="absolute top-4 right-4 bg-pink-500 text-white px-2 py-1 rounded-full text-sm">
                      {t("services.popular")}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {language === "sq" ? service.nameAl : service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === "sq"
                      ? service.descriptionAl
                      : service.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-pink-600">
                      €{service.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {service.duration} min
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/book?service=${service.slug}`}
                      className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg text-center hover:bg-pink-700 transition-colors"
                    >
                      {t("services.book")}
                    </Link>
                    <Link
                      href={`/services/${service.slug}`}
                      className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
                    >
                      {t("services.details")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            {t("services.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-3 bg-primary bg-opacity-10 rounded-full w-fit mb-4 text-primary">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">{service.description}</p>
              <Link
                href={service.link}
                className="text-primary font-medium group-hover:underline flex items-center"
              >
                Discover More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="px-8 py-3 border-2 border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-white transition-colors inline-block"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
