import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitDonation, useSubmitContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ExternalLink, Heart, Globe, Users, BookOpen, Laptop, Baby, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

// ─── NGO Data ────────────────────────────────────────────────────────────────

const ngos = [
  {
    id: "pratham",
    name: "Pratham Education Foundation",
    tagline: "India's largest NGO working on foundational education quality",
    focus: "Foundational literacy & numeracy (TaRL)",
    reach: "25+ states, 40 million children/yr",
    founded: 1994,
    rating: "GiveWell Top Charity",
    description: "Pratham's Teaching at the Right Level (TaRL) approach — grouping children by learning level rather than age — is backed by multiple J-PAL RCTs. Publishers of the annual ASER report, India's most credible education survey.",
    donateUrl: "https://www.pratham.org/get-involved/donate/",
    learnUrl: "https://www.pratham.org",
    icon: <BookOpen className="w-5 h-5" />,
    color: "border-secondary/40 hover:border-secondary/70",
    tagBg: "bg-secondary/10 text-secondary",
    category: "Literacy & Learning",
  },
  {
    id: "educate-girls",
    name: "Educate Girls",
    tagline: "Community-led model for enrolling and retaining girls in rural India",
    focus: "Girls' education, dropout prevention",
    reach: "14,000+ villages, Rajasthan / MP / UP",
    founded: 2007,
    rating: "GIIN Impact Star",
    description: "Deploys community volunteers (Team Balika) to identify and re-enrol out-of-school girls. Backed by India's first Development Impact Bond (DIB) — delivered 166% of enrollment targets.",
    donateUrl: "https://www.educategirls.ngo/donate",
    learnUrl: "https://www.educategirls.ngo",
    icon: <Users className="w-5 h-5" />,
    color: "border-rose-300/60 hover:border-rose-400",
    tagBg: "bg-rose-100 text-rose-700",
    category: "Girls' Education",
  },
  {
    id: "teach-for-india",
    name: "Teach For India",
    tagline: "Placing top graduates as full-time fellows in under-resourced schools",
    focus: "Urban government schools, leadership development",
    reach: "8 cities, 500+ active fellows",
    founded: 2009,
    rating: "CRY / CSR Box Verified",
    description: "Fellows commit 2 years to government and low-income private schools, delivering measurable learning gains. Over 3,500 alumni remain active in education reform across policy, NGO, and corporate sectors.",
    donateUrl: "https://www.teachforindia.org/donate",
    learnUrl: "https://www.teachforindia.org",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "border-accent/40 hover:border-accent/70",
    tagBg: "bg-accent/10 text-accent",
    category: "Teacher Quality",
  },
  {
    id: "nanhi-kali",
    name: "Nanhi Kali (Naandi Foundation)",
    tagline: "Sponsor a girl child's holistic education for ₹5,000 per year",
    focus: "Girl child sponsorship, after-school support",
    reach: "11 states, 500,000+ girls",
    founded: 1996,
    rating: "GuideStar India Platinum",
    description: "K.C. Mahindra Education Trust and Naandi Foundation's joint programme. Provides supplementary classes, school kits, and digital learning devices to girls. Transparent child-level tracking.",
    donateUrl: "https://www.nanhikali.org/sponsor-nanhikali-as-an-individual",
    learnUrl: "https://www.nanhikali.org",
    icon: <Heart className="w-5 h-5" />,
    color: "border-violet-300/60 hover:border-violet-400",
    tagBg: "bg-violet-100 text-violet-700",
    category: "Girls' Education",
  },
  {
    id: "cry",
    name: "CRY — Child Rights and You",
    tagline: "Holistic child rights across India since 1979",
    focus: "Child rights, nutrition, education, protection",
    reach: "All 28 states + UTs",
    founded: 1979,
    rating: "GuideStar India Platinum",
    description: "One of India's oldest child-rights organizations. Partners with 285+ grassroots organizations working on education access, birth registration, child labour, and nutrition. Annual audit publicly available.",
    donateUrl: "https://www.cry.org/donate",
    learnUrl: "https://www.cry.org",
    icon: <Heart className="w-5 h-5" />,
    color: "border-orange-300/60 hover:border-orange-400",
    tagBg: "bg-orange-100 text-orange-700",
    category: "Child Rights",
  },
  {
    id: "smile-foundation",
    name: "Smile Foundation",
    tagline: "Mission Education programme in over 2,000 schools and learning centres",
    focus: "Slum education, digital literacy, livelihood",
    reach: "25 states, 1.5 million children/yr",
    founded: 2002,
    rating: "ISO 9001:2015 Certified",
    description: "Runs 'Mission Education' after-school centres in urban slums and rural villages. Also runs STEM labs, girl child empowerment (She Can Fly), and e-learning initiatives. CSR-partnered with 300+ companies.",
    donateUrl: "https://www.smilefoundation.in/donate/",
    learnUrl: "https://www.smilefoundation.in",
    icon: <BookOpen className="w-5 h-5" />,
    color: "border-yellow-300/60 hover:border-yellow-400",
    tagBg: "bg-yellow-100 text-yellow-700",
    category: "Urban Education",
  },
  {
    id: "akanksha",
    name: "Akanksha Foundation",
    tagline: "Supplementary schools achieving 90% SSC pass rates in Mumbai and Pune",
    focus: "After-school centres in municipal corporation schools",
    reach: "Mumbai & Pune, 10,000+ students",
    founded: 1991,
    rating: "GIVE India Verified",
    description: "Operates 120 education centres inside BMC/PMC municipal schools. Students consistently outperform peers — 90% SSC completion vs 60% municipal average. 85% enroll in higher education.",
    donateUrl: "https://www.akanksha.org/donate",
    learnUrl: "https://www.akanksha.org",
    icon: <BookOpen className="w-5 h-5" />,
    color: "border-blue-300/60 hover:border-blue-400",
    tagBg: "bg-blue-100 text-blue-700",
    category: "Urban Education",
  },
  {
    id: "agastya",
    name: "Agastya International Foundation",
    tagline: "Hands-on science education for rural children via mobile science labs",
    focus: "Science education, creativity, rural India",
    reach: "21 states, 3.5 million students/yr",
    founded: 1999,
    rating: "Forbes Asia 200 Best Under A Billion NGO",
    description: "Mobile science labs and activity-based learning kits for rural government school children. 'Spark' programme trains student 'young instructors' who teach younger peers. 80% of participants are first-generation learners.",
    donateUrl: "https://www.agastya.org/donate",
    learnUrl: "https://www.agastya.org",
    icon: <Laptop className="w-5 h-5" />,
    color: "border-teal-300/60 hover:border-teal-400",
    tagBg: "bg-teal-100 text-teal-700",
    category: "STEM Education",
  },
  {
    id: "evidyaloka",
    name: "eVidyaloka",
    tagline: "Digital volunteer teachers delivering live classes to remote village schools",
    focus: "Digital education, rural connectivity",
    reach: "25 states, 600+ schools",
    founded: 2011,
    rating: "UN ECOSOC Special Consultative Status",
    description: "Connects skilled volunteers globally with rural schools lacking subject teachers via live video classes. Covers Math, Science, English, and Computer Science for Grades 6–10. Low cost — ₹8,000 per student per year.",
    donateUrl: "https://www.evidyaloka.org/donate",
    learnUrl: "https://www.evidyaloka.org",
    icon: <Laptop className="w-5 h-5" />,
    color: "border-indigo-300/60 hover:border-indigo-400",
    tagBg: "bg-indigo-100 text-indigo-700",
    category: "Digital Learning",
  },
  {
    id: "magic-bus",
    name: "Magic Bus",
    tagline: "Sport and life-skills programme bridging the adolescent school-to-livelihood gap",
    focus: "Life skills, adolescents, school retention",
    reach: "22 states, 400,000+ youth/yr",
    founded: 1999,
    rating: "FCRA Registered, CSR Box Verified",
    description: "Uses structured sports and activity curricula to teach leadership, critical thinking, and financial literacy. Particularly effective at keeping 12–18-year-olds in school through the vulnerable adolescent transition.",
    donateUrl: "https://www.magicbus.org/donate",
    learnUrl: "https://www.magicbus.org",
    icon: <Users className="w-5 h-5" />,
    color: "border-emerald-300/60 hover:border-emerald-400",
    tagBg: "bg-emerald-100 text-emerald-700",
    category: "Adolescent Retention",
  },
  {
    id: "save-children",
    name: "Save The Children India",
    tagline: "Emergency, development, and advocacy for child education and protection",
    focus: "Child education, disaster response, nutrition",
    reach: "18 states, 1 million+ children/yr",
    founded: 2008,
    rating: "GuideStar India Gold",
    description: "India branch of the global Save the Children movement. Runs schools in disaster zones, 'Bal Mitra' child protection groups, and early childhood development centres. Substantial work in Rajasthan, Odisha, and J&K.",
    donateUrl: "https://www.savethechildren.in/donate",
    learnUrl: "https://www.savethechildren.in",
    icon: <Baby className="w-5 h-5" />,
    color: "border-red-300/60 hover:border-red-400",
    tagBg: "bg-red-100 text-red-700",
    category: "Child Protection",
  },
  {
    id: "vidya",
    name: "Vidya — Child & Youth Development",
    tagline: "Delhi-based night schools and learning centres for working children",
    focus: "Working children, night schools, Delhi/NCR",
    reach: "Delhi, 12,000+ children/yr",
    founded: 1987,
    rating: "FCRA Registered",
    description: "Operates night schools for children who work during the day, plus community learning centres in 60+ slum clusters in Delhi. Strong track record of mainstreaming working children back into formal education.",
    donateUrl: "https://vidya-india.org/donate",
    learnUrl: "https://vidya-india.org",
    icon: <Globe className="w-5 h-5" />,
    color: "border-amber-300/60 hover:border-amber-400",
    tagBg: "bg-amber-100 text-amber-700",
    category: "Child Labour",
  },
];

const categories = ["All", "Literacy & Learning", "Girls' Education", "Urban Education", "Digital Learning", "STEM Education", "Adolescent Retention", "Teacher Quality", "Child Rights", "Child Protection", "Child Labour"];

// ─── Forms ───────────────────────────────────────────────────────────────────

const donationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
  currency: z.string().min(1, "Please select a currency"),
  message: z.string().optional(),
});

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.enum(["volunteer", "partner", "researcher", "media", "other"]),
});

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function GetInvolved() {
  const { toast } = useToast();
  const submitDonation = useSubmitDonation();
  const submitContact = useSubmitContact();
  const [activeTab, setActiveTab] = useState("donate");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNgos = activeCategory === "All"
    ? ngos
    : ngos.filter(n => n.category === activeCategory);

  const donationForm = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: { name: "", email: "", amount: 1000, currency: "INR", message: "" },
  });

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", type: "volunteer" },
  });

  const onDonationSubmit = (data: z.infer<typeof donationSchema>) => {
    submitDonation.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Pledge received", description: "Thank you for your generous support. We will be in touch shortly." });
        donationForm.reset();
      },
      onError: () => {
        toast({ title: "Error", description: "There was a problem submitting your pledge. Please try again.", variant: "destructive" });
      },
    });
  };

  const onContactSubmit = (data: z.infer<typeof contactSchema>) => {
    submitContact.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Message sent", description: "Thank you for reaching out. Our team will review your message." });
        contactForm.reset();
      },
      onError: () => {
        toast({ title: "Error", description: "There was a problem sending your message. Please try again.", variant: "destructive" });
      },
    });
  };

  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-6 border border-secondary/30">
              <Heart className="w-4 h-4" /> 12 Verified NGOs with Direct Donation Links
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-5">Take Action</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Every rupee, hour, and connection matters. Donate directly to verified NGOs, pledge institutional support, or reach out to partner with the EduEquity India research team.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── NGO Directory ─────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Civil Society</span>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-3">NGO Directory</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              All organizations listed are FCRA-registered or internationally accredited, with publicly available annual reports and audited accounts. Donation links go directly to each NGO.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredNgos.map((ngo, i) => (
              <motion.div
                key={ngo.id}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className={`flex flex-col p-6 rounded-2xl bg-card border transition-all card-lift ${ngo.color}`}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${ngo.tagBg}`}>
                    {ngo.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-foreground text-sm leading-snug">{ngo.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{ngo.tagline}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className={`text-xs ${ngo.tagBg} border-0`}>{ngo.category}</Badge>
                  <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-0">Est. {ngo.founded}</Badge>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-0">{ngo.rating}</Badge>
                </div>

                {/* Reach */}
                <div className="text-xs text-muted-foreground mb-3 space-y-1">
                  <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 shrink-0" />{ngo.reach}</div>
                  <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 shrink-0" />{ngo.focus}</div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">{ngo.description}</p>

                {/* CTAs */}
                <div className="flex gap-2 mt-auto">
                  <a
                    href={ngo.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5" /> Donate
                  </a>
                  <a
                    href={ngo.learnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Learn More
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredNgos.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No NGOs in this category.</p>
          )}
        </div>
      </section>

      {/* ── Pledge & Contact Forms ────────────────────────────── */}
      <section className="py-16 md:py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Institutional Engagement</span>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Partner with Us</h2>
              <p className="text-muted-foreground">
                For institutional donors, corporate CSR teams, and policy researchers looking to fund or collaborate on education equity work.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="donate" className="text-base py-3">Pledge Funding</TabsTrigger>
                <TabsTrigger value="contact" className="text-base py-3">Partner &amp; Volunteer</TabsTrigger>
              </TabsList>

              <TabsContent value="donate">
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Make a Funding Pledge</CardTitle>
                    <CardDescription>
                      Pledges help us forecast available resources for upcoming interventions. This is a non-binding declaration of intent to fund — we will follow up with formal agreements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...donationForm}>
                      <form onSubmit={donationForm.handleSubmit(onDonationSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={donationForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name / Organization</FormLabel>
                                <FormControl><Input placeholder="Acme Foundation" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donationForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Email</FormLabel>
                                <FormControl><Input placeholder="contact@example.com" type="email" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={donationForm.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pledge Amount</FormLabel>
                                <FormControl><Input type="number" min="1" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donationForm.control}
                            name="currency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Currency</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="INR">INR (₹)</SelectItem>
                                    <SelectItem value="USD">USD ($)</SelectItem>
                                    <SelectItem value="EUR">EUR (€)</SelectItem>
                                    <SelectItem value="GBP">GBP (£)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={donationForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Optional)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Any specific regions or interventions you wish to support?" className="resize-none min-h-[100px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-base font-semibold" disabled={submitDonation.isPending}>
                          {submitDonation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                          Submit Pledge
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact">
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Reach Out</CardTitle>
                    <CardDescription>
                      Interested in volunteering, partnering, or conducting joint research? Let us know how you'd like to collaborate.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...contactForm}>
                      <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={contactForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={contactForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl><Input placeholder="you@example.com" type="email" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={contactForm.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Inquiry Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="volunteer">Volunteer</SelectItem>
                                    <SelectItem value="partner">Implementation Partner</SelectItem>
                                    <SelectItem value="researcher">Research Collaboration</SelectItem>
                                    <SelectItem value="media">Media Inquiry</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={contactForm.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl><Input placeholder="Brief topic" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={contactForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea placeholder="How would you like to get involved?" className="resize-none min-h-[150px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={submitContact.isPending}>
                          {submitContact.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                          Send Message
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
