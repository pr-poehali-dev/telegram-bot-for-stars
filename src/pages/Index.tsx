import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Star {
  id: number;
  name: string;
  constellation: string;
  brightness: number;
  price: number;
  description: string;
  coordinates: string;
  magnitude: number;
  distance: string;
}

const mockStars: Star[] = [
  {
    id: 1,
    name: 'Альтаир',
    constellation: 'Орёл',
    brightness: 95,
    price: 150000,
    description: 'Яркая звезда первой величины, символ стремительности и силы. Идеальный подарок для целеустремлённых личностей.',
    coordinates: 'RA 19h 50m 47s / Dec +08° 52\' 06"',
    magnitude: 0.77,
    distance: '16.7 световых лет'
  },
  {
    id: 2,
    name: 'Вега',
    constellation: 'Лира',
    brightness: 98,
    price: 280000,
    description: 'Одна из самых ярких звёзд ночного неба. Символ гармонии и совершенства. Премиальный выбор для особенных событий.',
    coordinates: 'RA 18h 36m 56s / Dec +38° 47\' 01"',
    magnitude: 0.03,
    distance: '25 световых лет'
  },
  {
    id: 3,
    name: 'Денеб',
    constellation: 'Лебедь',
    brightness: 92,
    price: 190000,
    description: 'Мощная звезда-сверхгигант, видимая на огромных расстояниях. Олицетворение величия и амбиций.',
    coordinates: 'RA 20h 41m 26s / Dec +45° 16\' 49"',
    magnitude: 1.25,
    distance: '2600 световых лет'
  },
  {
    id: 4,
    name: 'Сириус',
    constellation: 'Большой Пёс',
    brightness: 100,
    price: 350000,
    description: 'Самая яркая звезда земного неба. Элитный выбор для тех, кто стремится к исключительности.',
    coordinates: 'RA 06h 45m 09s / Dec -16° 42\' 58"',
    magnitude: -1.46,
    distance: '8.6 световых лет'
  },
  {
    id: 5,
    name: 'Арктур',
    constellation: 'Волопас',
    brightness: 88,
    price: 220000,
    description: 'Оранжевый гигант, четвёртая по яркости звезда. Символ мудрости и долговечности.',
    coordinates: 'RA 14h 15m 40s / Dec +19° 10\' 56"',
    magnitude: -0.05,
    distance: '36.7 световых лет'
  },
  {
    id: 6,
    name: 'Капелла',
    constellation: 'Возничий',
    brightness: 90,
    price: 175000,
    description: 'Двойная звезда золотистого цвета. Олицетворение партнёрства и гармонии.',
    coordinates: 'RA 05h 16m 41s / Dec +45° 59\' 53"',
    magnitude: 0.08,
    distance: '42.2 световых лет'
  }
];

const constellations = ['Все', 'Орёл', 'Лира', 'Лебедь', 'Большой Пёс', 'Волопас', 'Возничий'];

export default function Index() {
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);
  const [constellation, setConstellation] = useState('Все');
  const [priceRange, setPriceRange] = useState([100000, 400000]);
  const [brightnessFilter, setBrightnessFilter] = useState([0, 100]);

  const filteredStars = mockStars.filter(star => {
    const matchesConstellation = constellation === 'Все' || star.constellation === constellation;
    const matchesPrice = star.price >= priceRange[0] && star.price <= priceRange[1];
    const matchesBrightness = star.brightness >= brightnessFilter[0] && star.brightness <= brightnessFilter[1];
    return matchesConstellation && matchesPrice && matchesBrightness;
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="relative z-10">
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-shimmer">
                  <Icon name="Sparkles" className="text-primary" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Stellar Elite</h1>
                  <p className="text-sm text-muted-foreground font-serif">Эксклюзивный каталог звёзд</p>
                </div>
              </div>
              <Button className="gap-2 font-medium">
                <Icon name="User" size={18} />
                Профиль
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Владейте звездой
            </h2>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
              Подарите себе или близким частичку космоса. Каждая звезда сертифицирована и занесена в международный реестр.
            </p>
          </div>

          <Card className="p-6 mb-10 backdrop-blur-sm bg-card/80 border-border/40 animate-scale-in">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block text-foreground">Созвездие</label>
                <Select value={constellation} onValueChange={setConstellation}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {constellations.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block text-foreground">
                  Ценовой диапазон: {priceRange[0].toLocaleString('ru-RU')} - {priceRange[1].toLocaleString('ru-RU')} ₽
                </label>
                <Slider
                  min={100000}
                  max={400000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block text-foreground">
                  Яркость: {brightnessFilter[0]}% - {brightnessFilter[1]}%
                </label>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={brightnessFilter}
                  onValueChange={setBrightnessFilter}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <p className="text-sm text-muted-foreground">
                  Найдено звёзд: <span className="font-semibold text-primary">{filteredStars.length}</span>
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setConstellation('Все');
                    setPriceRange([100000, 400000]);
                    setBrightnessFilter([0, 100]);
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStars.map((star, index) => (
              <Card 
                key={star.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 backdrop-blur-sm bg-card/80 border-border/40 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedStar(star)}
              >
                <div className="relative h-48 bg-gradient-to-br from-muted via-card to-background overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-primary/30 blur-2xl absolute inset-0 animate-shimmer" />
                      <Icon name="Sparkles" size={48} className="text-primary relative z-10 animate-float" />
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground border-none">
                    {star.brightness}% яркости
                  </Badge>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{star.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Icon name="MapPin" size={14} />
                        {star.constellation}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 font-serif line-clamp-2">
                    {star.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div>
                      <p className="text-2xl font-bold text-primary">{star.price.toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <Button size="sm" className="gap-2 group-hover:gap-3 transition-all">
                      Подробнее
                      <Icon name="ArrowRight" size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredStars.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Звёзды не найдены</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры фильтрации</p>
            </div>
          )}
        </main>

        <footer className="border-t border-border/40 mt-20 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="Info" size={18} />
                  О сервисе
                </h4>
                <p className="text-sm text-muted-foreground font-serif">
                  Stellar Elite — эксклюзивная платформа для приобретения именных звёзд с официальной регистрацией.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="MessageCircle" size={18} />
                  Поддержка
                </h4>
                <p className="text-sm text-muted-foreground">support@stellar-elite.com</p>
                <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="Shield" size={18} />
                  Гарантии
                </h4>
                <p className="text-sm text-muted-foreground font-serif">
                  Сертификат подлинности и пожизненная регистрация в международной базе.
                </p>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground border-t border-border/40 pt-6">
              © 2024 Stellar Elite. Все права защищены.
            </div>
          </div>
        </footer>
      </div>

      <Dialog open={!!selectedStar} onOpenChange={() => setSelectedStar(null)}>
        <DialogContent className="max-w-2xl backdrop-blur-xl bg-card/95 border-border/40">
          {selectedStar && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-4">
                  <DialogTitle className="text-3xl font-bold text-foreground">{selectedStar.name}</DialogTitle>
                  <Badge className="bg-primary/90 text-primary-foreground border-none text-base px-4 py-1">
                    {selectedStar.brightness}% яркости
                  </Badge>
                </div>
                <DialogDescription className="text-base font-serif text-muted-foreground">
                  {selectedStar.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-muted/30 border-border/40">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <Icon name="MapPin" size={16} />
                      Созвездие
                    </p>
                    <p className="font-semibold text-foreground">{selectedStar.constellation}</p>
                  </Card>
                  
                  <Card className="p-4 bg-muted/30 border-border/40">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <Icon name="Sparkles" size={16} />
                      Звёздная величина
                    </p>
                    <p className="font-semibold text-foreground">{selectedStar.magnitude}m</p>
                  </Card>
                  
                  <Card className="p-4 bg-muted/30 border-border/40">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <Icon name="Navigation" size={16} />
                      Расстояние
                    </p>
                    <p className="font-semibold text-foreground">{selectedStar.distance}</p>
                  </Card>
                  
                  <Card className="p-4 bg-muted/30 border-border/40">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <Icon name="Compass" size={16} />
                      Координаты
                    </p>
                    <p className="font-semibold text-foreground text-xs">{selectedStar.coordinates}</p>
                  </Card>
                </div>

                <Card className="p-6 bg-gradient-to-br from-primary/10 to-background border-primary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Стоимость владения</p>
                      <p className="text-4xl font-bold text-primary">{selectedStar.price.toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <Button size="lg" className="gap-2 text-lg px-8">
                      <Icon name="ShoppingCart" size={20} />
                      Приобрести
                    </Button>
                  </div>
                </Card>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Icon name="Heart" size={18} />
                    В избранное
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Icon name="Share2" size={18} />
                    Поделиться
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
