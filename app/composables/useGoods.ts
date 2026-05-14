import { onMounted } from 'vue'
import { useGoodsStore } from '../store/goods'

interface PlanWithColor {
  id: number
  icon: string
  price: string
  period: string
  name: string
  color: string
  selected: boolean
}

// Composable для работы с товарами и подписками
// Управляет загрузкой данных и преобразованием их в формат компонентов
export const useGoods = () => {
  const goodsStore = useGoodsStore()

  // Инициализация: загрузить данные при использовании
  onMounted(async () => {
    if (goodsStore.goods.length === 0) {
      await goodsStore.fetchGoods()
    }
  })

  // Цветовая схема для каждого типа подписки
  const planColorMap: Record<string, string> = {
    'Individual': 'bg-[#FFD2D7]',
    'Duo': 'bg-[#FFC862]',
    'Family': 'bg-[#A5BBD1]',
    'Platinum': 'bg-[#C4B1D4]'
  }

  // Преобразует план из хранилища в формат для компонента PlanCard
  const transformPlan = (plan: any): PlanWithColor => ({
    ...plan,
    color: planColorMap[plan.name] || 'bg-gray-300',

    // насчет поля state я понимаю, что состояний может быть разное количество, 
    // пока что для удобства я пеервёл его в булевое значение. 
    // В проде я бы описал разные css классы для разных состояний.
    selected: plan.state === 'selected'
  })

  // Получает все планы для категории с цветами и состоянием
  const getPlansForCategory = (category: any) => {
    return category.plans.map((plan: any) => transformPlan(plan))
  }

  // Получает доступные регионы из mock данных
  const getAvailableRegions = () => {
    return goodsStore.regions.map(region => ({
      name: region.region,
      region_id: region.region_id
    }))
  }

  return {
    // Store reference
    goodsStore,
    
    // Methods
    getPlansForCategory,
    getAvailableRegions
  }
}
