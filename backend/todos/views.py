
from rest_framework import viewsets, filters
from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all() 
    
    serializer_class = TodoSerializer
    
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    
    search_fields = ['title', 'description']
    
    ordering_fields = ['title', 'status', 'created_at']

    ordering = ['-created_at'] 

    def get_queryset(self):
        queryset = super().get_queryset()
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter.upper())
        return queryset