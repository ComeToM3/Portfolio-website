'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Mail, 
  User, 
  Calendar, 
  Eye, 
  Trash2, 
  Reply,
  Search,
  Filter,
  Archive,
  Star,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  isArchived: boolean;
  isStarred: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'starred' | 'archived'>('all');

  // Données de démonstration
  const demoMessages: Message[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      message: 'Bonjour, je suis intéressé par vos compétences en développement web. Pouvez-vous me contacter pour discuter d\'un projet ?',
      createdAt: '2024-01-15T10:30:00Z',
      isRead: false,
      isArchived: false,
      isStarred: true
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@company.com',
      message: 'Votre portfolio est très impressionnant ! Nous cherchons un développeur full-stack pour rejoindre notre équipe.',
      createdAt: '2024-01-14T15:45:00Z',
      isRead: true,
      isArchived: false,
      isStarred: false
    },
    {
      id: '3',
      name: 'Pierre Durand',
      email: 'pierre.durand@startup.io',
      message: 'Salut ! J\'ai vu vos projets sur GitHub. Seriez-vous disponible pour une collaboration sur un projet React/Node.js ?',
      createdAt: '2024-01-13T09:20:00Z',
      isRead: true,
      isArchived: true,
      isStarred: false
    },
    {
      id: '4',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@agency.fr',
      message: 'Nous organisons un événement tech et aimerions vous inviter à présenter vos projets. Intéressé ?',
      createdAt: '2024-01-12T14:15:00Z',
      isRead: false,
      isArchived: false,
      isStarred: true
    }
  ];

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setMessages(demoMessages);
      setFilteredMessages(demoMessages);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = messages;

    // Filtre par statut
    switch (filter) {
      case 'unread':
        filtered = filtered.filter(msg => !msg.isRead);
        break;
      case 'read':
        filtered = filtered.filter(msg => msg.isRead);
        break;
      case 'starred':
        filtered = filtered.filter(msg => msg.isStarred);
        break;
      case 'archived':
        filtered = filtered.filter(msg => msg.isArchived);
        break;
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  }, [messages, filter, searchTerm]);

  const toggleRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: !msg.isRead } : msg
    ));
  };

  const toggleStarred = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const toggleArchived = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isArchived: !msg.isArchived } : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Messages de Contact
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gérez les messages reçus via le formulaire de contact
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{messages.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Non lus</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {messages.filter(m => !m.isRead).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Favoris</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {messages.filter(m => m.isStarred).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Archive className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Archivés</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {messages.filter(m => m.isArchived).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'Tous' },
                  { key: 'unread', label: 'Non lus' },
                  { key: 'read', label: 'Lus' },
                  { key: 'starred', label: 'Favoris' },
                  { key: 'archived', label: 'Archivés' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as any)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      filter === key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="max-h-96 overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  Aucun message trouvé
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    } ${!message.isRead ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {message.name}
                          </p>
                          {!message.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                          {message.isStarred && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {message.email}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                          {message.message}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                      
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStarred(message.id);
                          }}
                          className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                            message.isStarred ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                        >
                          <Star className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleArchived(message.id);
                          }}
                          className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                            message.isArchived ? 'text-blue-500' : 'text-gray-400'
                          }`}
                        >
                          <Archive className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Message de {selectedMessage.name}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleRead(selectedMessage.id)}
                      className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        selectedMessage.isRead ? 'text-green-600' : 'text-blue-600'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleStarred(selectedMessage.id)}
                      className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        selectedMessage.isStarred ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleArchived(selectedMessage.id)}
                      className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        selectedMessage.isArchived ? 'text-blue-500' : 'text-gray-400'
                      }`}
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-2 text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <User className="w-4 h-4 inline mr-2" />
                      Nom
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedMessage.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedMessage.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(selectedMessage.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Message
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Reply className="w-4 h-4" />
                    <span>Répondre</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Aucun message sélectionné
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Sélectionnez un message dans la liste pour voir son contenu
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

