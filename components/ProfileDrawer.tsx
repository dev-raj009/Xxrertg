'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Code, Database, Globe, Smartphone, Cloud, Shield, Server, Cpu, Monitor, Terminal, Layout, Layers, Box, Network } from 'lucide-react';
import Image from 'next/image';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const skills = [
    { category: 'Programming Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Dart', 'Scala', 'Haskell', 'Perl', 'Lua', 'R', 'MATLAB', 'Assembly', 'Objective-C', 'Groovy', 'Elixir', 'Clojure', 'F#', 'Erlang', 'Julia', 'Cobol', 'Fortran', 'Lisp', 'Prolog', 'Ada', 'Pascal', 'VHDL', 'Verilog', 'Solidity', 'Bash', 'PowerShell'], icon: Code, color: 'text-blue-500' },
    { category: 'Web Development', items: ['HTML5', 'CSS3', 'React', 'Angular', 'Vue.js', 'Next.js', 'Nuxt.js', 'Svelte', 'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'Ruby on Rails', 'ASP.NET Core', 'Laravel', 'Symfony', 'Gatsby', 'Remix', 'Astro', 'Tailwind CSS', 'Bootstrap', 'Sass', 'Less', 'Webpack', 'Vite', 'Babel', 'GraphQL', 'REST APIs', 'WebSockets', 'WebRTC', 'Service Workers', 'PWA', 'WebAssembly'], icon: Globe, color: 'text-green-500' },
    { category: 'Mobile Development', items: ['iOS (Swift/Objective-C)', 'Android (Kotlin/Java)', 'React Native', 'Flutter', 'Xamarin', 'Ionic', 'Cordova', 'Capacitor', 'NativeScript', 'Appcelerator Titanium', 'J2ME', 'Symbian C++', 'BlackBerry Java'], icon: Smartphone, color: 'text-purple-500' },
    { category: 'Cloud Computing', items: ['AWS (Amazon Web Services)', 'Microsoft Azure', 'Google Cloud Platform (GCP)', 'IBM Cloud', 'Oracle Cloud', 'DigitalOcean', 'Linode', 'Heroku', 'Vercel', 'Netlify', 'Firebase', 'Supabase', 'Appwrite', 'Cloudflare', 'Serverless Framework', 'AWS Lambda', 'Azure Functions', 'Google Cloud Functions'], icon: Cloud, color: 'text-sky-500' },
    { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'Oracle Database', 'Microsoft SQL Server', 'SQLite', 'MariaDB', 'MongoDB', 'Redis', 'Cassandra', 'Couchbase', 'CouchDB', 'Neo4j', 'ArangoDB', 'DynamoDB', 'Cosmos DB', 'Firebase Realtime Database', 'Firestore', 'Elasticsearch', 'Solr', 'Splunk', 'InfluxDB', 'Prometheus', 'TimescaleDB', 'Snowflake', 'BigQuery', 'Redshift'], icon: Database, color: 'text-orange-500' },
    { category: 'DevOps & Infrastructure', items: ['Docker', 'Kubernetes', 'Docker Swarm', 'Mesos', 'Terraform', 'Ansible', 'Chef', 'Puppet', 'Vagrant', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions', 'CircleCI', 'Travis CI', 'Bamboo', 'TeamCity', 'Nagios', 'Zabbix', 'Datadog', 'New Relic', 'Grafana', 'Kibana', 'Logstash', 'Fluentd', 'Nginx', 'Apache', 'HAProxy', 'Traefik', 'Envoy'], icon: Server, color: 'text-red-500' },
    { category: 'Artificial Intelligence & Machine Learning', items: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Natural Language Processing (NLP)', 'Computer Vision', 'Reinforcement Learning', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn', 'OpenCV', 'NLTK', 'Spacy', 'Hugging Face Transformers', 'OpenAI API', 'LangChain', 'LlamaIndex', 'AutoML', 'Data Mining', 'Data Engineering', 'Big Data', 'Hadoop', 'Spark', 'Kafka', 'Flink'], icon: Cpu, color: 'text-indigo-500' },
    { category: 'Cybersecurity', items: ['Penetration Testing', 'Vulnerability Assessment', 'Ethical Hacking', 'Cryptography', 'Network Security', 'Application Security', 'Endpoint Security', 'Cloud Security', 'Identity and Access Management (IAM)', 'Security Information and Event Management (SIEM)', 'Incident Response', 'Forensics', 'Malware Analysis', 'Reverse Engineering', 'OWASP Top 10', 'Burp Suite', 'Metasploit', 'Nmap', 'Wireshark', 'Snort', 'Suricata', 'Zeek', 'OSINT'], icon: Shield, color: 'text-yellow-500' },
    { category: 'Game Development', items: ['Unity', 'Unreal Engine', 'Godot', 'CryEngine', 'GameMaker Studio', 'Construct', 'Phaser', 'Three.js', 'Babylon.js', 'Cocos2d', 'LibGDX', 'MonoGame', 'SFML', 'SDL', 'OpenGL', 'Vulkan', 'DirectX', 'Metal', 'WebGPU'], icon: Monitor, color: 'text-pink-500' },
    { category: 'UI/UX Design', items: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer', 'Zeplin', 'Balsamiq', 'Axure RP', 'Marvel', 'Proto.io', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Information Architecture', 'Interaction Design', 'Visual Design', 'Design Systems', 'Accessibility (a11y)'], icon: Layout, color: 'text-teal-500' },
    { category: 'Operating Systems & Systems Programming', items: ['Linux (Ubuntu, CentOS, Debian, Red Hat, Arch, etc.)', 'Windows', 'macOS', 'Unix', 'FreeBSD', 'OpenBSD', 'Shell Scripting', 'Kernel Development', 'Device Drivers', 'Embedded Systems', 'RTOS (Real-Time Operating Systems)', 'Arduino', 'Raspberry Pi', 'Microcontrollers', 'IoT (Internet of Things)'], icon: Terminal, color: 'text-slate-500' },
    { category: 'Software Architecture & Patterns', items: ['Microservices', 'Monolithic Architecture', 'Serverless Architecture', 'Event-Driven Architecture', 'Service-Oriented Architecture (SOA)', 'Domain-Driven Design (DDD)', 'Test-Driven Development (TDD)', 'Behavior-Driven Development (BDD)', 'Agile Methodologies', 'Scrum', 'Kanban', 'Design Patterns (Gang of Four)', 'SOLID Principles', 'Clean Architecture', 'Hexagonal Architecture'], icon: Layers, color: 'text-emerald-500' },
    { category: 'Version Control & Collaboration', items: ['Git', 'Subversion (SVN)', 'Mercurial', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Trello', 'Asana', 'Confluence', 'Slack', 'Microsoft Teams', 'Discord'], icon: Box, color: 'text-cyan-500' },
    { category: 'Hardware & Networking', items: ['Computer Architecture', 'Digital Logic Design', 'FPGA', 'ASIC', 'PCB Design', 'TCP/IP', 'DNS', 'DHCP', 'HTTP/HTTPS', 'FTP', 'SSH', 'SMTP', 'POP3/IMAP', 'BGP', 'OSPF', 'VLAN', 'VPN', 'SDN (Software-Defined Networking)', 'Load Balancing', 'Firewalls', 'Routers/Switches'], icon: Network, color: 'text-amber-500' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[320px] sm:w-[400px] bg-black shadow-2xl z-50 flex flex-col border-l border-white/10"
          >
            {/* Header */}
            <div className="p-6 bg-black text-white relative overflow-hidden shrink-0 border-b border-white/10">
              <div className="absolute top-0 right-0 p-4 z-20">
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors backdrop-blur-md border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center mt-4">
                <div className="w-24 h-24 rounded-full border-4 border-white/10 overflow-hidden mb-4 shadow-xl bg-white/5 flex items-center justify-center">
                  <Image 
                    src="https://i.postimg.cc/zBFfBhtG/IMG-20260324-140610-299.jpg" 
                    alt="VIP Study Profile" 
                    width={96} 
                    height={96} 
                    className="object-cover"
                  />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">VIP Study</h2>
                <p className="text-white/40 text-sm font-medium tracking-widest uppercase mt-1">Premium Education</p>
              </div>
              
              {/* Decorative background elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
              <div className="absolute top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-black">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/5 text-white rounded-xl border border-white/10">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter">Knowledge Skills</h3>
                </div>

                <div className="space-y-8">
                  {skills.map((category, idx) => (
                    <div key={idx} className="bg-white/5 p-5 rounded-2xl shadow-sm border border-white/10">
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                        <h4 className="font-bold text-white/80 text-sm uppercase tracking-tight">{category.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill, skillIdx) => (
                          <span 
                            key={skillIdx}
                            className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider rounded-md hover:bg-white/10 hover:text-white hover:border-white/20 transition-colors cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center text-white/20 text-xs font-medium pb-8">
                  End of known computer skills.
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
