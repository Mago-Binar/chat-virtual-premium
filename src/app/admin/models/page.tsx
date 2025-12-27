'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, X, Save, Upload } from 'lucide-react';

interface Model {
  id: string;
  name: string;
  age: number;
  nationality: string;
  coverPhoto: string;
  videoUrl?: string;
  tags: string[];
  slug: string;
  shortBio: string;
  longBio: string;
  conversationStyle: string;
  interests: string[];
  gallery: string[];
  colors: {
    primary: string;
    secondary: string;
  };
}

export default function AdminModelsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: 18,
    nationality: '',
    coverPhoto: '',
    videoUrl: '',
    tags: '',
    shortBio: '',
    longBio: '',
    conversationStyle: '',
    interests: '',
    galleryImages: [] as Array<{ id: string; url: string; tag: string }>,
    primaryColor: '#FF1B6D',
    secondaryColor: '#FF6B9D',
  });

  useEffect(() => {
    const auth = localStorage.getItem('admin-authenticated');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      loadModels();
    }
  }, [router]);

  const loadModels = async () => {
    try {
      const response = await fetch('/api/models');
      if (response.ok) {
        const data = await response.json();
        setModels(data);
      } else {
        setModels([]);
      }
    } catch {
      setModels([]);
    }
  };

  const handleOpenModal = (model?: Model) => {
    if (model) {
      setEditingModel(model);
      setFormData({
        name: model.name,
        age: model.age,
        nationality: model.nationality,
        coverPhoto: model.coverPhoto,
        videoUrl: model.videoUrl || '',
        tags: model.tags.join(', '),
        shortBio: model.shortBio,
        longBio: model.longBio,
        conversationStyle: model.conversationStyle,
        interests: model.interests.join(', '),
        galleryImages: model.gallery.map((url, index) => ({
          id: `img-${index}`,
          url,
          tag: `tag-${index}`
        })),
        primaryColor: model.colors.primary,
        secondaryColor: model.colors.secondary,
      });
    } else {
      setEditingModel(null);
      setFormData({
        name: '',
        age: 18,
        nationality: '',
        coverPhoto: '',
        videoUrl: '',
        tags: '',
        shortBio: '',
        longBio: '',
        conversationStyle: '',
        interests: '',
        galleryImages: [],
        primaryColor: '#FF1B6D',
        secondaryColor: '#FF6B9D',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingModel(null);
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer upload');
    }

    const data = await response.json();
    return data.url;
  };

  const handleCoverPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadFile(file);
        setFormData({ ...formData, coverPhoto: url });
      } catch {
        alert('❌ Erro ao fazer upload da imagem');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadFile(file);
        setFormData({ ...formData, videoUrl: url });
      } catch {
        alert('❌ Erro ao fazer upload do vídeo');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    setIsUploading(true);
    
    for (const file of files) {
      try {
        const url = await uploadFile(file);
        const newImage = {
          id: `img-${Date.now()}-${Math.random()}`,
          url,
          tag: `tag-${Date.now()}`
        };
        setFormData(prev => ({
          ...prev,
          galleryImages: [...prev.galleryImages, newImage]
        }));
      } catch {
        alert('❌ Erro ao fazer upload de uma das imagens');
      }
    }
    
    setIsUploading(false);
  };

  const handleRemoveGalleryImage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter(img => img.id !== id)
    }));
  };

  const handleUpdateImageTag = (id: string, tag: string) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.map(img => 
        img.id === id ? { ...img, tag } : img
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('❌ O campo "Nome da Modelo" é obrigatório!');
      return;
    }

    if (!formData.coverPhoto) {
      alert('❌ A foto de capa é obrigatória!');
      return;
    }

    setIsSaving(true);

    const modelData = {
      name: formData.name,
      age: formData.age,
      nationality: formData.nationality,
      coverPhoto: formData.coverPhoto,
      videoUrl: formData.videoUrl || null,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      shortBio: formData.shortBio,
      longBio: formData.longBio,
      conversationStyle: formData.conversationStyle,
      interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean),
      gallery: formData.galleryImages.map(img => img.url),
      colors: {
        primary: formData.primaryColor,
        secondary: formData.secondaryColor,
      },
    };

    try {
      let response;
      
      if (editingModel) {
        response = await fetch(`/api/models/${editingModel.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(modelData),
        });
      } else {
        response = await fetch('/api/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(modelData),
        });
      }

      if (response.ok) {
        await loadModels();
        handleCloseModal();
        alert('✅ Modelo salva com sucesso! As mudanças já estão visíveis no site.');
        router.push('/admin/dashboard');
      } else {
        const error = await response.json();
        alert(`❌ Erro ao salvar: ${error.error}`);
      }
    } catch {
      alert('❌ Erro ao salvar modelo');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('⚠️ ATENÇÃO: Tem certeza que deseja excluir permanentemente esta modelo?\n\nEsta ação irá:\n• Remover todos os dados do banco\n• Excluir a página da modelo do site\n• Esta ação NÃO pode ser desfeita')) {
      try {
        const response = await fetch(`/api/models/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await loadModels();
          alert('✅ Modelo excluída permanentemente do sistema.');
        } else {
          alert('❌ Erro ao excluir modelo');
        }
      } catch {
        alert('❌ Erro ao excluir modelo');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Gerenciar Modelos</h1>
              <p className="text-white/60">Adicione, edite ou remova modelos</p>
            </div>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            Adicionar Modelo
          </button>
        </div>

        {/* Models Grid */}
        {models.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <div
                key={model.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-all"
              >
                <div className="relative aspect-[3/4]">
                  <img
                    src={model.coverPhoto}
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
                  <p className="text-white/60 mb-4">
                    {model.age} anos • {model.nationality}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {model.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(model)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(model.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-6">
              <Plus className="w-10 h-10 text-white/40" />
            </div>
            <p className="text-white/60 text-lg mb-6">Nenhum modelo cadastrado ainda.</p>
            <button
              onClick={() => handleOpenModal()}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Adicionar Modelo
            </button>
          </div>
        )}
      </div>

      {/* Modal - REDIMENSIONADO E COM SCROLL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gradient-to-b from-purple-950/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-gradient-to-b from-purple-950/90 to-transparent pb-4 z-10">
              <h2 className="text-2xl font-bold text-white">
                {editingModel ? 'Editar Modelo' : 'Adicionar Novo Modelo'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome da Modelo */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-semibold">
                  Nome da Modelo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  placeholder="Digite o nome da modelo"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Idade</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                    required
                    min="18"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Nacionalidade</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                    required
                  />
                </div>
              </div>

              {/* Upload de Foto de Capa */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-semibold">
                  Foto de Capa <span className="text-red-500">*</span>
                </label>
                {formData.coverPhoto ? (
                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={formData.coverPhoto}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverPhoto: '' })}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 rounded-xl p-6 text-center cursor-pointer transition-all block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverPhotoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-white/60" />
                      <p className="text-white/60 text-sm">
                        {isUploading ? 'Fazendo upload...' : 'Arraste uma imagem ou clique'}
                      </p>
                    </div>
                  </label>
                )}
              </div>

              {/* Upload de Vídeo do Card */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-semibold">
                  Vídeo do Card (5 segundos recomendado)
                </label>
                <p className="text-white/40 text-xs mb-3">
                  Este vídeo será reproduzido ao passar o mouse sobre o card da modelo.
                </p>
                {formData.videoUrl ? (
                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                    <video
                      src={formData.videoUrl}
                      className="w-full h-48 object-cover"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, videoUrl: '' })}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 rounded-xl p-6 text-center cursor-pointer transition-all block">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-white/60" />
                      <p className="text-white/60 text-sm">
                        {isUploading ? 'Fazendo upload...' : 'Arraste um vídeo ou clique'}
                      </p>
                    </div>
                  </label>
                )}
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  placeholder="Carinhosa, Sensual, Divertida"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm">Bio Curta</label>
                <textarea
                  value={formData.shortBio}
                  onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white h-20 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm">Bio Longa</label>
                <textarea
                  value={formData.longBio}
                  onChange={(e) => setFormData({ ...formData, longBio: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white h-24 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm">Estilo de Conversa</label>
                <textarea
                  value={formData.conversationStyle}
                  onChange={(e) => setFormData({ ...formData, conversationStyle: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm">Interesses (separados por vírgula)</label>
                <input
                  type="text"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  placeholder="Música, Arte, Viagens"
                />
              </div>

              {/* Galeria de Imagens */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-semibold">
                  Galeria de Imagens (Chat)
                </label>
                <p className="text-white/40 text-xs mb-3">
                  Estas imagens aparecerão no chat. Adicione tags para vincular com vídeos futuramente.
                </p>
                
                <label className="border-2 border-dashed border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 rounded-xl p-4 text-center cursor-pointer transition-all block mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-5 h-5 text-white/60" />
                    <p className="text-white/60 text-xs">
                      {isUploading ? 'Fazendo upload...' : 'Clique ou arraste múltiplas imagens'}
                    </p>
                  </div>
                </label>

                {formData.galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                    {formData.galleryImages.map((img) => (
                      <div key={img.id} className="relative bg-white/5 rounded-lg p-2">
                        <img
                          src={img.url}
                          alt="Gallery"
                          className="w-full h-20 object-cover rounded-lg mb-2"
                        />
                        <input
                          type="text"
                          value={img.tag}
                          onChange={(e) => handleUpdateImageTag(img.id, e.target.value)}
                          placeholder="Tag/ID"
                          className="w-full bg-white/10 border border-white/10 rounded px-2 py-1 text-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(img.id)}
                          className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 rounded transition-colors"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Cor Primária</label>
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Cor Secundária</label>
                  <input
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 sticky bottom-0 bg-gradient-to-t from-purple-950/90 to-transparent pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
